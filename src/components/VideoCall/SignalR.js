import { Component } from 'react';
import { string, func, bool } from 'prop-types';
import * as signalR from '@microsoft/signalr';
import { getBearer } from "../../shared/utility";


// import store from 'store/redux';
// import { addPatientStartedVideoEventAction, removePatientStartedVideoEventAction } from 'redux/telemedicine/actions';
// import { extractEventIdFromRoutePath } from 'utils';
//import { console.log } from 'components/Telemedicine/utils';

const environment = {
    host: "http://localhost:5000",
};

const CONNECTION_STATE = {
    Connected: 'Connected',
};

const HUB_LISTENER_EVENTS = {
    ReceiveNotification: 'ReceiveNotification',
    SendMessage: 'SendMessage',
};

const HUB_LISTENER_EVENTS_EVENTS = {
    ReceiveNotification: {
        UserEnteredRoom: 'UserEnteredRoom',
        UserLeftRoom: 'UserLeftRoom',
    },
    SendMessage: {
        UserJoinedToRoom: 'UserJoinedToRoom',
        SendSignal: 'SendSignal',
        UserDisconnect: 'UserDisconnect',
        ReceiverDeclinedCall: 'ReceiverDeclinedCall',
    },
};

let hubConnection = null;

class Signalr extends Component {
    startConnection = async () => {
        if (hubConnection?.state === CONNECTION_STATE.Connected) return;

        if (!hubConnection) {
            // https://docs.microsoft.com/en-us/aspnet/core/signalr/diagnostics?view=aspnetcore-3.1
            console.log('new signalR.HubConnectionBuilder: builded');

            hubConnection = new signalR.HubConnectionBuilder()
                .configureLogging(signalR.LogLevel.Debug)
                .withUrl(`${environment.host}/signalrtc`, { accessTokenFactory: () => getBearer(), withCredentials:false })
                .withAutomaticReconnect()
                .build();

            hubConnection.onclose(() => {
                console.log('hubConnection onclose', hubConnection);
                // this.connectToServer();
            });

            // hubConnection.on(HUB_LISTENER_EVENTS.ReceiveNotification, (model) => {
            //     const { isInRoom, onUserEnteredRoom } = this.props;
            //     console.log('hubConnection.on(ReceiveNotification): ', model);

            //     switch (model.event) {
            //         case HUB_LISTENER_EVENTS_EVENTS.ReceiveNotification.UserEnteredRoom: {
            //             const patientEvent = {
            //                 ...model.data.event,
            //                 patient: model.data.patient,
            //             };

            //             const eventIdFromUrl = extractEventIdFromRoutePath(window.location.pathname);

            //             // Notification should be displayed when user is not in event from ReceiveNotification, or user is not in room
            //             if (eventIdFromUrl !== patientEvent.eventId || !isInRoom) {
            //                 store.dispatch(addPatientStartedVideoEventAction(patientEvent));
            //                 NotificationActions.videoEvent(patientEvent);
            //             }

            //             if (typeof onUserEnteredRoom === 'function') {
            //                 onUserEnteredRoom(model);
            //             }

            //             break;
            //         }
            //         case HUB_LISTENER_EVENTS_EVENTS.ReceiveNotification.UserLeftRoom: {
            //             store.dispatch(removePatientStartedVideoEventAction(model.data.event.eventId))
            //             break;
            //         }
            //         default:
            //     }
            // });

            hubConnection.on(HUB_LISTENER_EVENTS.SendMessage, (model) => {
                console.log('hubConnection.on(SendMessage): ', model);

                switch (model.event) {
                    case HUB_LISTENER_EVENTS_EVENTS.SendMessage.UserJoinedToRoom:
                        const newUser = {
                            connectionId: model.connectionId,
                            roomId: model.data.roomId,
                        };

                        this.props.onNewUserArrived(newUser);
                        break;
                    case HUB_LISTENER_EVENTS_EVENTS.SendMessage.SendSignal:
                        const signalData = { roomId: model.data.roomId, signal: model.data.signal };
                        this.props.onSendSignal(signalData);
                        break;

                    case HUB_LISTENER_EVENTS_EVENTS.SendMessage.ReceiverDeclinedCall: {
                        this.props.onPatientDeclinedCall();

                        break;
                    }

                    case HUB_LISTENER_EVENTS_EVENTS.SendMessage.UserDisconnect:
                        this.props.onUserDisconnect(model);
                        break;
                    default:
                }
            });
        }

        await hubConnection.start();

        console.log('Connection started');

        console.log({ hubConnection });
    };

    invoke = async (...args) => {
        try {
            if (hubConnection?.state === CONNECTION_STATE.Connected) {
                await hubConnection.invoke(...args);
            } else {
                try {
                    await this.connectToServer();
                    hubConnection.invoke(...args);
                } catch (error) {
                    console.log('WS connection losted', error);
                    throw error;
                }
            }
        } catch (error) {
            console.log(`Can't invoke hubConnection method 'invoke'`, error, { args });
            throw error;
        }
    };

    resourceChangedAsync = () => console.log('ResourceChanged'); //this.invoke('ResourceChanged');

    joinToRoomAsync = (roomId) => {
        const { resourceId } = this.props;
        console.log(`joinToRoomAsync ${roomId} ${JSON.stringify({ resourceId })}`)
        return this.invoke(HUB_LISTENER_EVENTS_EVENTS.SendMessage.UserJoinedToRoom, roomId, JSON.stringify({ resourceId }));
    };

    connectToServer = async () => {
        try {
            await this.startConnection();
        } catch (e) {
            throw e;
        }
    };

    sendSignalToUser = (signal, roomId) => {
        this.invoke('SendSignal', signal, roomId);
    };

    leaveRoomAsync = async (roomId) => {
        try {
            console.log('SignalR leaveRoom');
            const { resourceId } = this.props;

            return await this.invoke('LeaveRoom', roomId, JSON.stringify({ resourceId }));
        } catch (error) {
            throw error;
        }
    };

    sendRoomEvent = ({ eventName, roomId, resourceId }) => {
        const jsonParams = JSON.stringify({ resourceId });

        this.invoke('RoomEvent', roomId, eventName, jsonParams);
    };

    startCall = ({ roomId }) => {
        console.log('SignalR startCall');
        const { resourceId } = this.props;

        this.sendRoomEvent({ eventName: 'StartCall', roomId, resourceId });
    };

    endCall = ({ roomId }) => {
        console.log('SignalR endCall');
        const { resourceId } = this.props;

        this.sendRoomEvent({ eventName: 'EndCall', roomId, resourceId });
    };

    callToPatientAsync = ({ roomId }) => this.invoke('MakeUserCall', roomId);
    cancelCallToPatientAsync = ({ roomId }) => this.invoke('CancelUserCall', roomId);

    render() {
        return null;
    }
}

Signalr.propTypes = {
    resourceId: string.isRequired,
    isInRoom: bool,
    onUserEnteredRoom: func,
    onPatientDeclinedCall: func,
    onNewUserArrived: func,
    onSendSignal: func,
    onUserDisconnect: func,
};

Signalr.defaultProps = {
    isInRoom: false,
    onUserEnteredRoom: null,
    onPatientDeclinedCall: null,
    onNewUserArrived: null,
    onSendSignal: null,
    onUserDisconnect: null,
};

export default Signalr;
