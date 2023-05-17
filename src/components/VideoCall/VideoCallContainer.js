import * as signalR from '@microsoft/signalr';
import React, { useEffect, useState, useRef } from 'react';
import { getBearer } from "../../shared/utility";
import Signalr from './SignalR';
import RtcService from './RTCService';
import Icon from '../Icon/Icon';
import { Button, Card } from 'antd';
import { getUserMedia } from '../../shared/utility';
import Photo from '../Photo/Photo';
import classnames from 'classnames';
import axios from 'axios';
import "./index.scss"

const rtcSendDataTypes = {
    TOGGLE_VIDEO: 'TOGGLE_VIDEO',
    TOGGLE_AUDIO: 'TOGGLE_AUDIO',
    END_CALL: 'END_CALL',
};

const rtcSendDataAction = (type, payload) => ({
    type,
    payload,
});
const getStatusName = ({
    isConnectingToWsServer,
    isLoadingEnterRoom,
    isInRoom,
    isPatientInRoom,
    isCallingToPatient,
    isPatientCanceledCall,
    isCallTimedOut,
}) => {
    switch (true) {
        case isPatientCanceledCall:
            return (
                <span>
                    <b>Пацієнт скасував виклик</b>
                    <br />
                    <br />
                    <span>Ви можете повторити дзвінок</span>
                </span>
            );
        case isCallTimedOut:
            return (
                <span>
                    <b>Пацієнт не відповідає</b>
                    <br />
                    <br />
                    <span>Ви можете повторити дзвінок</span>
                </span>
            );
        case isCallingToPatient:
            return <b>Телефонуємо...</b>;
        case isConnectingToWsServer:
            return <b>Підключаємось</b>;
        case isLoadingEnterRoom:
            return <b>Входимо в кабінет відеозв'язку</b>;
        case !isInRoom:
            return <b>Увійдіть в кабінет відеозв'язку</b>;
        case isInRoom:
            return <b>{isPatientInRoom ? 'Пацієнт приєднався та очікує' : 'Пацієнт ще не підключився'}</b>;
        default:
    }
};


export default class VideoCallContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingEnterRoom: false,
            currentEventId: undefined,
            event: undefined,
            eventPathName: '',
            users: [],
            /**
             * Application is connected to ws server
             */
            isConnectedToWsServer: false,
            isConnectingToWsServer: false,
            isInRoom: false,
            isPeerCreated: false, // приєднались до відео
            isVideoActive: true,
            isAudioActive: true,
            isRemoteVideoActive: true,
            isRemoteAudioActive: true,
            isFullScreen: false,
            rtcConfig: null, // Object
            isLeavingRoom: false,
            patient: undefined,

            // Patient call state
            isCallingToPatient: false,
            isPatientCanceledCall: false,
            isCallTimedOut: false,
        };
    }
    stream = null;

    componentDidMount() {
        this.startWsConnection();

        window.addEventListener('unload', this.leaveRoomAsync);
    }

    componentWillUnmount() {
        const { currentEventId } = this.state;

        window.removeEventListener('unload', this.leaveRoomAsync);
    }

    // const localVideoRef = useRef(null);
    // const remoteVideoRef = useRef(null);
    // const [connection, setConnection] = useState(null);
    // const [peerConnection, setPeerConnection] = useState(null);
    // useEffect(() => {
    //     startWsConnection()
    // }, []);

    startWsConnection = async () => {
        try {
            this.setState({ isConnectingToWsServer: true });
            await this.signalR.connectToServer();

            this.setState({ isConnectedToWsServer: true, isConnectingToWsServer: false });
        } catch (e) {
            this.setState({ isConnectingToWsServer: false });

            console.log('НЕ ЗМОГЛИ ВСТАНОВИТИ WS CONNECT :(');
        }
    };
    // startCall = async () => {
    //     const offer = await peerConnection.createOffer();
    //     await peerConnection.setLocalDescription(offer);

    //     connection.send('message', JSON.stringify({ 'sdp': peerConnection.localDescription }));

    //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    //         stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

    //         if (localVideoRef.current) {
    //             localVideoRef.current.srcObject = stream;
    //         }
    //     });
    // };
    createPeer = async () => {
        const {roomId} = this.props;

        try {
            await this.getCameraAccess();

            this.setState({ isLoading: true });
            this.rtcService.createPeer(this.stream, roomId, true);

            this.signalR.startCall({ roomId });
        } catch (e) { }
    };
    enterRoom = async () => {
        const { isConnectedToWsServer } = this.state;
        const {roomId} = this.props;

        if (!isConnectedToWsServer) return;

        try {
            this.setState({ isLoadingEnterRoom: true });
            await this.loadRoomInfo(roomId);

            if (!this.stream) {
                await this.getCameraAccess();
              }
              
            await this.signalR.joinToRoomAsync(roomId);
            if ('srcObject' in this.videoPlayer) {
                this.miniVideoPlayer.srcObject = this.stream;
            } else {
                // Avoid using this in new browsers, as it is going away.
                this.miniVideoPlayer.src = URL.createObjectURL(this.stream);
            }
            this.setState({ isInRoom: true, isLoadingEnterRoom: false });
        } catch (error) {
            this.setState({ isLoadingEnterRoom: false });
            console.log(`Can't join room, error ${error}`);
        }
    };

    getCameraAccess = async () => {
        try {
            this.setState({ isLoading: true });
            this.stream = await getUserMedia({ video: true, audio: true });
            console.log("stream:", this.props.userRole, this.stream)
            this.setState({ isLoading: false, isVideoActive: true, isAudioActive: true });
        } catch (error) {
            this.setState({ isLoading: false });
            console.log(`Can't get camera access; ${error.name}: ${error.message}`);
            throw error;
        }
    };

    destroy = () => {
        this.rtcService.destroy();
        this.setState({ isPeerCreated: false, isFullScreen: false });
        this.stopVideoStream(true);
    };
    onSignalrSendSignal = (signalData) => {
        this.rtcService.signalPeer(signalData.roomId, signalData.signal, this.stream);
    };

    onSignalrUserDisconnect = () => {
        this.setState({ users: [] });
        this.destroy();
    };

    rtcOnSignal = (data) => {
        this.signalR.sendSignalToUser(data.signal, data.roomId);
    };

    rtcOnStream = (data) => {
        this.setState({ isRemoteVideoActive: true, isRemoteAudioActive: true });

        if ('srcObject' in this.videoPlayer) {
            this.videoPlayer.srcObject = data.data;
            this.miniVideoPlayer.srcObject = this.stream;
        } else {
            // Avoid using this in new browsers, as it is going away.
            this.videoPlayer.src = URL.createObjectURL(data.data);
            this.miniVideoPlayer.src = URL.createObjectURL(this.stream);
        }

        this.videoPlayer.onloadedmetadata = () => {
            this.videoPlayer.play();
        };
    };

    rtcOnConnect = () => {
        this.setState({ isPeerCreated: true, isLoading: false });
    };

    rtcOnData = (data) => {
        switch (data.type) {
            case rtcSendDataTypes.TOGGLE_VIDEO:
                this.setState({ isRemoteVideoActive: data.payload });
                break;
            case rtcSendDataTypes.TOGGLE_AUDIO:
                this.setState({ isRemoteAudioActive: data.payload });
                break;
            default:
        }
    };

    rtcOnClose = () => {
        this.setState({ isPeerCreated: false, isFullScreen: false, isLoading: false });
    };

    rtcOnError = () => {
        this.setState({ isFullScreen: false, isLoading: false });
    };

    // openModal = () => {
    //     const {
    //         params: { eventId },
    //         openVideoRoomModal,
    //     } = this.props;

    //     this.setState({ currentEventId: eventId }, openVideoRoomModal);
    // };

    closeModal = () => {
        this.props.closeVideoRoomModal();
    };

    stopVideoStream = (disableTracks) => {
        if (!this.stream) return;

        const tracks = this.stream.getTracks();

        if(disableTracks){
        tracks.forEach((track) => {
            track.stop();
        });
    }

        if ('srcObject' in this.videoPlayer) {
            this.videoPlayer.srcObject = null;
            this.miniVideoPlayer.srcObject = null;
        } else {
            this.videoPlayer.src = null;
            this.miniVideoPlayer.src = null;
        }
    };

    checkPatientInRoom = () => {
        const { userId } = this.props;
        const { users } = this.state;

        if (!users.length) return false;

        return users.some(user => user.id !== userId);
    };

    toggleVideo = () => {
        const videoTracks = this.stream.getVideoTracks();
        if (videoTracks.length === 0) {
            console.log('No local video available.');
            return;
        }

        console.log('Toggling video mute state.');
        for (let i = 0; i < videoTracks.length; ++i) {
            videoTracks[i].enabled = !videoTracks[i].enabled;
        }

        this.rtcService.send(rtcSendDataAction(rtcSendDataTypes.TOGGLE_VIDEO, videoTracks[0].enabled));
        this.setState({ isVideoActive: videoTracks[0].enabled });
        console.log(`Video ${videoTracks[0].enabled ? 'unmuted.' : 'muted.'}`);
    };

    toggleAudio = () => {
        const audioTracks = this.stream.getAudioTracks();
        if (audioTracks.length === 0) {
            console.log('No local audio available.');
            return;
        }

        console.log('Toggling audio mute state.');
        for (let i = 0; i < audioTracks.length; ++i) {
            audioTracks[i].enabled = !audioTracks[i].enabled;
        }

        this.rtcService.send(rtcSendDataAction(rtcSendDataTypes.TOGGLE_AUDIO, audioTracks[0].enabled));
        this.setState({ isAudioActive: audioTracks[0].enabled });
        console.log(`Audio ${audioTracks[0].enabled ? 'unmuted.' : 'muted.'}`);
    };

    toggleFullScreen = () => {
        this.setState(({ isFullScreen }) => ({ isFullScreen: !isFullScreen }));
    };
    loadRoomInfo(roomId){
        axios
      .get(`/api/websocket/v1/sockethub/rooms/${roomId}`, {
        headers: {
          Authorization: "Bearer " + getBearer(),
        },
      })
      .then((response) => {
        this.setState({ users: response.data ? response.data.users : [] });
      });
    }
    onSignalrNewUserArrived = (user) => {
        
        this.setState({ users: [user] });
    };
    closeVideoRoom = async () => {
        console.log("closeVideoRoom:called")
        try {
            this.setState({ isLeavingRoom: true });

            await  this.leaveRoomAsync();
            //this.closeModal();
        } catch (error) {
            console.log("error : ", error)
        } finally {
            this.setState({ isLeavingRoom: false });
        }
    };
    leaveRoomAsync = async () => {
        try {
            const { isInRoom } = this.state;
            const {roomId} = this.props;

            if (isInRoom && this.signalR) {
                await this.signalR.leaveRoomAsync(roomId);
                this.setState({ isInRoom: false });
            }
            this.destroy()
        } catch (error) {
            //NotificationActions.somethingWrong();
            throw error;
        }
    };
    render() {
        const { userId } = this.props;
        const {
            isConnectingToWsServer,
            isLoadingEnterRoom,
            isConnectedToWsServer,
            isLoading,
            isInRoom,
            isPeerCreated,
            event = {},
            eventPathName,
            isVideoActive,
            isAudioActive,
            isFullScreen,
            isRemoteVideoActive,
            isRemoteAudioActive,
            isLeavingRoom,
            patient,

            isCallingToPatient,
            isPatientCanceledCall,
            isCallTimedOut,
        } = this.state;

        const isPatientInRoom = this.checkPatientInRoom();
        return (
            <Card >
                <RtcService
                    ref={(domNode) => {
                        this.rtcService = domNode;
                    }}
                    rtcOnSignal={this.rtcOnSignal}
                    rtcOnStream={this.rtcOnStream}
                    rtcOnConnect={this.rtcOnConnect}
                    rtcOnData={this.rtcOnData}
                    rtcOnClose={this.rtcOnClose}
                    rtcOnError={this.rtcOnError}
                />
                <Signalr
                    ref={(domNode) => {
                        this.signalR = domNode;
                    }}
                    onNewUserArrived={this.onSignalrNewUserArrived}
                    onUserEnteredRoom={this.onUserEnteredRoom}
                    onSendSignal={this.onSignalrSendSignal}
                    onUserDisconnect={this.onSignalrUserDisconnect}
                    onPatientDeclinedCall={this.onPatientDeclinedCall}
                    resourceId={userId}
                    isInRoom={isInRoom}
                />
                {(isConnectingToWsServer || isConnectedToWsServer) && (
                    <div>
                        {!isPeerCreated && (
                            <div className="VideoRoom__statusBlock">

                                <div className="VideoRoom__statusBlock__text text-center">
                                    {getStatusName({
                                        isConnectingToWsServer,
                                        isLoadingEnterRoom,
                                        isInRoom,
                                        isPatientInRoom,
                                        isCallingToPatient,
                                        isPatientCanceledCall,
                                        isCallTimedOut,
                                    })}
                                </div>
                            </div>
                        )}

                        <div className={`VideoRoom__video ${isPeerCreated ? 'VideoRoom__video-visible' : ''}`}>
                            <video
                                ref={(domNode) => {
                                    this.videoPlayer = domNode;
                                }}
                                id="videoPlayer"
                                className={isFullScreen ? 'remoteVideo__fullScreen' : ''}
                                width="100%"
                            />

                            {event.patient && !isRemoteVideoActive && (
                                <div
                                    className={''}
                                >
                                    <Photo type="patient" sex={event.patient.sex} classImg="remotePatientPhoto" />
                                </div>
                            )}

                            {!isRemoteAudioActive && (
                                <Icon
                                    name="microphoneoff"
                                    color="gray"
                                    style={{ fontSize: '30px' }}
                                    wrapperClassName={'remoteAudioIcon'}
                                />
                            )}

                            <video
                                ref={(domNode) => {
                                    this.miniVideoPlayer = domNode;
                                }}
                                id="mini-video"
                                className={classnames('miniVideo', { 'miniVideo--fullScreen': isFullScreen })}
                                autoPlay
                                playsInline
                                muted
                            />
                        </div>
                        <div className="VideoRoom__actionBlock">
                            <div className="margin-bottom-offset-10">
                                {!isInRoom && !isConnectingToWsServer && !isLoadingEnterRoom && (
                                    <Button type="primary"
                                        size="large"
                                        style={{ fontSize: "18px" }} onClick={this.enterRoom}>
                                        Увійти
                                    </Button>
                                )}

                                {isInRoom && isPatientInRoom && !isPeerCreated && this.props.userRole !== "PATIENT"&& (
                                    <Button
                                        type="primary"
                                        size="large"
                                        style={{ fontSize: "18px" }}
                                        onClick={this.createPeer}
                                        className="block margin-bottom-offset-10"
                                    >
                                        Розпочати прийом
                                    </Button>
                                )}



                                {isInRoom && !isPeerCreated && !isCallingToPatient && (
                                    <div>
                                        <div>
                                            <div className="flex-container margin-bottom-offset-10">
                                                <div className="font-size-middle">
                                                    <Icon name="info-circle" className="text-info" />
                                                </div>
                                                <div className="text-disabled font-size-small">
                                                    Якщо консультація надається іншими засобами зв’язку, закрийте вікно відеозв’язку
                                                </div>
                                            </div>
                                            <Button
                                                bsStyle="default"
                                                className="block"
                                                onClick={this.closeVideoRoom}
                                                isLoading={isLeavingRoom}
                                            >
                                                Закрити
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {isPeerCreated && (
                                    <div className={classnames({ 'VideoRoom__videoControlsBlockWrapper--fullScreen': isFullScreen })}>
                                        <div className="VideoRoom__videoControlsBlock">
                                            <div>
                                                <Button
                                                    title={isVideoActive ? 'Выключить видео' : 'Включить видео'}
                                                    className="margin-right-offset-10"
                                                    active={isVideoActive.toString()}
                                                    onClick={this.toggleVideo}
                                                >
                                                    <Icon
                                                        color={isVideoActive ? 'white' : undefined}
                                                        name={isVideoActive ? 'camera' : 'cameraoff'}
                                                    />
                                                </Button>

                                                <Button
                                                    title={isAudioActive ? 'Выключить звук' : 'Включить звук'}
                                                    className="margin-right-offset-10"
                                                    active={isAudioActive.toString()}
                                                    onClick={this.toggleAudio}
                                                >
                                                    <Icon
                                                        color={isVideoActive ? 'white' : undefined}
                                                        name={isAudioActive ? 'microphone' : 'microphoneoff'}
                                                    />
                                                </Button>

                                                <Button
                                                    title={isFullScreen ? 'Выход из полноэкранного режима' : 'Во весь экран'}
                                                    active={"false"}
                                                    onClick={this.toggleFullScreen}
                                                >
                                                    <Icon name={isFullScreen ? 'expand-o' : 'expand'} />
                                                </Button>
                                            </div>

                                            <Button
                                                title={'Завершити'}
                                                className="VideoRoom__btnIcon"
                                                onClick={this.closeVideoRoom}
                                            >
                                                <Icon name="callend" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Card>

        );
    }
}
