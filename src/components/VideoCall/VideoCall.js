import * as signalR from '@microsoft/signalr';
import React, { useEffect, useState, useRef } from 'react';
import { getBearer } from "../../shared/utility";




export const VideoCall = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [connection, setConnection] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    useEffect(() => {
        const startConnection = async () => {
            const conn = new signalR.HubConnectionBuilder()
                .withUrl('http://localhost:5000/signalrtc', { accessTokenFactory: () => getBearer() })
                .configureLogging(signalR.LogLevel.Information)
                .withAutomaticReconnect()
                .build();

            await conn.start();
            setConnection(conn);

            conn.on('SendConferenceData', async (message) => {
                const decodedMessage = JSON.parse(message);

                if (decodedMessage.sdp) {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(decodedMessage.sdp));
                    if (peerConnection.remoteDescription.type === 'offer') {
                        const answer = await peerConnection.createAnswer();
                        await peerConnection.setLocalDescription(answer);
                        conn.send('message', JSON.stringify({ 'sdp': peerConnection.localDescription }));
                    }
                } else if (decodedMessage.candidate) {
                    try {
                        await peerConnection.addIceCandidate(decodedMessage.candidate);
                    } catch (e) {
                        console.error('Error adding received ice candidate', e);
                    }
                }
            });

            const pc = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: 'stun:stun.stunprotocol.org'
                    }
                ]
            });

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    conn.send('message', JSON.stringify({ 'candidate': event.candidate }));
                }
            };

            pc.oniceconnectionstatechange = (event) => {
                if (pc.iceConnectionState === 'connected') {
                    // Peers connected!
                }
            };

            pc.ontrack = (event) => {
                if (remoteVideoRef.current && event.streams[0]) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
            };

            setPeerConnection(pc);
        };

        //startConnection();
    }, []);

    const startCall = async () => {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        connection.send('message', JSON.stringify({ 'sdp': peerConnection.localDescription }));

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
        });
    };
    return (
        <div>
            <h1>Video Call</h1>
            <video ref={localVideoRef} autoPlay muted></video>
            <video ref={remoteVideoRef} autoPlay></video>
            <button onClick={startCall}>Start Call</button>
        </div>
    );
}
