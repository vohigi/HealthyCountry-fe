import { Component } from 'react';
import SimplePeer from 'simple-peer';


export default class RtcService extends Component {
    createPeer = (stream, roomId, initiator) => {
        const  rtcConfig  = 
            {
                iceServers: [
                    {
                        urls: 'stun:stun.stunprotocol.org'
                    }
                ]
            }
        

        this.currentPeer = new SimplePeer({
            initiator,
            stream,
            reconnectTimer: 500,
            trickle: false,
            ...(rtcConfig ? { config: rtcConfig } : {}),
        });

        this.currentPeer.on('signal', (data) => {
            console.log("peer.on('signal')", data);
            const signal = JSON.stringify(data);
            this.props.rtcOnSignal({ roomId, signal });
        });

        this.currentPeer.on('stream', (data) => {
            console.log("peer.on('stream')", data);
            this.props.rtcOnStream({ data });
        });

        this.currentPeer.on('connect', () => {
            console.log("peer.on('connect')");
            this.props.rtcOnConnect();
        });

        this.currentPeer.on('data', (data) => {
            try {
                const value = JSON.parse(data.toString());
                console.log("peer.on('data')", value);

                this.props.rtcOnData(value);
            } catch (e) {
                console.log("peer.on('data'): ", 'err parse data');
            }
        });

        this.currentPeer.on('close', () => {
            console.log("peer.on('close')");
            this.destroy();
            this.props.rtcOnClose();
        });

        this.currentPeer.on('error', (err) => {
            console.log("peer.on('error')", err);
            this.props.rtcOnError();
        });
    };

    signalPeer = (roomId, signal, stream) => {
        const signalObject = JSON.parse(signal);
        console.log('this.currentPeer: ', this.currentPeer);
        if (this.currentPeer) {
            console.log('signalPeer - currentPeer (initiator: treu)');

            try {
                this.currentPeer.signal(signalObject);
            } catch (e) {
                console.log('cannot signal after peer is destroyed');
            }
        } else {
            console.log('signalPeer - createPeer (initiator: false)');
            this.createPeer(stream, roomId, false);
            this.currentPeer.signal(signalObject);
        }
    };

    destroy = () => {
        console.log('RtcService destroy this.currentPeer: ', this.currentPeer);
        this.currentPeer && this.currentPeer.destroy();
        this.currentPeer = undefined;
    };

    send = (data) => {
        try {
            this.currentPeer.send(JSON.stringify(data));
        } catch (e) {
            console.log('cannot send after peer is destroyed');
        }
    };

    render() {
        return null;
    }
}
