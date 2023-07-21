import {useRef} from 'react';

function Meeting(){
    const makeRoomButtonRef = useRef(null);
    const joinRoomButtonRef = useRef(null);
    const hangupButtonRef = useRef(null);
    if(hangupButtonRef.current){
        hangupButtonRef.current.disabled = true;
    }

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const pcRef=useRef(null);
    let localStream=null;

    const ws = new WebSocket("ws://localhost:8001")
    ws.onmessage = e => {
        const data=JSON.parse(e.data)
        if (!localStream) {
            console.log('not ready yet');
            return;
        }
        switch (data.type) {
        case 'offer':
        handleOffer(data);
        break;
        case 'answer':
        handleAnswer(data);
        break;
        case 'candidate':
        handleCandidate(data);
        break;
        case 'ready':
        // A second tab joined. This tab will initiate a call unless in a call already.
        if (pcRef.current) {
            console.log('already in call, ignoring');
            return;
        }
        makeCall();
        break;
        case 'bye':
        if (pcRef.current) {
            hangup();
        }
        break;
        default:
        console.log('unhandled', e);
        break;
    }
};
async function makeRoom() {
  localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
  localVideoRef.current.srcObject = localStream;


  makeRoomButtonRef.current.disabled = true;
  hangupButtonRef.current.disabled = false;

  ws.send(JSON.stringify({type: 'ready'}));
}

async function hangup() {
  if (pcRef.current) {
    pcRef.current.close();
    pcRef.current = null;
  }
  localStream.getTracks().forEach(track => track.stop());
  localStream = null;
  makeRoomButtonRef.current.disabled = false;
  hangupButtonRef.current.disabled = true;
  ws.send(JSON.stringify({type: 'bye'}));
};

function createPeerConnection() {
  pcRef.current = new RTCPeerConnection();
  pcRef.current.onicecandidate = e => {
    const message = {
      type: 'candidate',
      candidate: null,
    };
    if (e.candidate) {
      message.candidate = e.candidate.candidate;
      message.sdpMid = e.candidate.sdpMid;
      message.sdpMLineIndex = e.candidate.sdpMLineIndex;
    }
    ws.send(JSON.stringify(message));
  };
  pcRef.current.ontrack = e => remoteVideoRef.srcObject = e.streams[0];
  localStream.getTracks().forEach(track => pcRef.current.addTrack(track, localStream));
}

async function makeCall() {
  await createPeerConnection();

  const offer = await pcRef.current.createOffer();
  ws.send(JSON.stringify({type: 'offer', sdp: offer.sdp}));
  await pcRef.current.setLocalDescription(offer);
}

async function handleOffer(offer) {
  if (pcRef.current) {
    console.error('existing peerconnection');
    return;
  }
  await createPeerConnection();
  await pcRef.current.setRemoteDescription(offer);

  const answer = await pcRef.current.createAnswer();
  ws.send(JSON.stringify({type: 'answer', sdp: answer.sdp}));
  await pcRef.current.setLocalDescription(answer);
}

async function handleAnswer(answer) {
  if (!pcRef.current) {
    console.error('no peerconnection');
    return;
  }
  await pcRef.current.setRemoteDescription(answer);
}

async function handleCandidate(candidate) {
  if (!pcRef.current) {
    console.error('no peerconnection');
    return;
  }
  if (!candidate.candidate) {
    await pcRef.current.addIceCandidate(null);
  } else {
    await pcRef.current.addIceCandidate(candidate);
  }
}
  
    return (
        <div className="container">
            <video ref={localVideoRef} autoPlay />
            <video ref={remoteVideoRef} autoPlay />
            
            <button type="button" className="btn btn-outline-primary ms-1" ref={makeRoomButtonRef} onClick={makeRoom}>방만들기</button>
            <button type="button" className="btn btn-outline-primary ms-1" ref={joinRoomButtonRef} >참여하기</button>
            <button type="button" className="btn btn-outline-primary ms-1" ref={hangupButtonRef} onClick={hangup}>통화종료</button>
        </div>
    )
}
export default Meeting
