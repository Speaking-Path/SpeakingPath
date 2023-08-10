import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React from 'react';
import './Untact.css';
import UserVideoComponent from './UserVideoComponent';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux"
// import { getToken, createSession, createToken } from './getToken';
import './Untact.scss'


const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

const Untact = () => {
  const [mySessionId, setMySessionId] = useState(undefined);
  const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const userId = useSelector((state) => { return state.loginId })

  const location = useLocation();

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);

    setMyUserName(userId);
    if(location.state.sessionId!==undefined){
      setMySessionId(location.state.sessionId);
      console.log("sessionId: %s",location.state.sessionId)
    }
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  const onbeforeunload = (event) => {
    leaveSession();
  }

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  }

  const handleChangeUserName = (e) => {
    setMyUserName(e.target.value);
  }

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  }

  const deleteSubscriber = (streamManagerToDelete) => {
    setSubscribers((prevSubscribers) => {
      const updatedSubscribers = prevSubscribers.filter(
        (streamManager) => streamManager !== streamManagerToDelete
      );
      return updatedSubscribers;
    });
  };

  const joinSession = async () => {

    const OV = new OpenVidu();

    const mySession = OV.initSession()
    setSession(mySession)

    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });


    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });
    
    // getToken(mySessionId, APPLICATION_SERVER_URL)
    //   .then((token) => {
    //     mySession.connect(token, { clientData: myUserName })
    //       .then(async () => {

    //         let publisher = await OV.initPublisherAsync(undefined, {
    //           audioSource: undefined,
    //           videoSource: undefined,
    //           publishAudio: true,
    //           publishVideo: true,
    //           resolution: '640x480',
    //           frameRate: 30,
    //           insertMode: 'APPEND',
    //           mirror: false,
    //         });
    //         console.log("내 퍼블리셔", publisher)
    //         setPublisher(publisher);


    //         const devices = await OV.getDevices();
    //         const videoDevices = devices.filter(device => device.kind === 'videoinput');
    //         const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
    //         const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

    //         setCurrentVideoDevice(currentVideoDevice)
    //         setMainStreamManager(publisher)
    //         setPublisher(publisher)
    //       })
    //       .catch((error) => {
    //         console.log('There was an error connecting to the session:', error.code, error.message);
    //       });
    //   });
    // }
    try {
      const token = await getToken(mySessionId); 
      await mySession.connect(token, { clientData: myUserName });
  
      let publisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: false,
      });
      setPublisher(publisher);
      mySession.publish(publisher)
  
      const devices = await OV.getDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
      const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);
  
      setCurrentVideoDevice(currentVideoDevice);
      setMainStreamManager(publisher);
      setPublisher(publisher);
    } catch (error) {
      console.log('There was an error connecting to the session:', error.code, error.message);
    }
  }

  const leaveSession = () => {

    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }
    setSession(undefined)
    setSubscribers([])
    setMySessionId('')
    setMyUserName('Participant' + Math.floor(Math.random() * 100))
    setPublisher(undefined)
  }

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  }

  const createSession = async (sessionId) => {
  const data = JSON.stringify({ customSessionId: sessionId })
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', data, {
      headers: { 'Content-Type': 'application/json', },
    });
    console.log("세션이에요", response.data)
    return response.data;
  }

  const createToken = async (sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
      headers: { 'Content-Type': 'application/json', },
    });
    return response.data;
  }


  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 // 배경 이미지
  const background = {
    //width: '100vw',
    height: '140vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    //maxWidth: '50vw',
  };

  if (session === undefined) {
    background.backgroundImage = `url(${process.env.PUBLIC_URL}/assets/conference.jpg)`;
    background.backgroundSize = 'auto 100%';
    // backgroundSize: '60vw 100vh',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center'
  } else {
    background.backgroundImage = `url(${process.env.PUBLIC_URL}/assets/conference2.jpg)`;
    background.backgroundSize = 'cover';
  }


  return (
    <div id="box" style={background}>
      <div>
        {session === undefined ? (
          <div id="join">
            <div>
              {/* <button className='btn btn-primary btn-lg px-5 py-3 fs-6 fw-bolder m-5' style={{ background: 'linear-gradient(45deg, #007bff, #6610f2)' }}
              onClick={joinSession}> 입장하기 </button> */}
              <button className='comet' onClick={joinSession}> 입장하기 </button>
            </div>
          </div>
        ) : null}
      </div>

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <HighlightOffIcon id="closeIcon" color="white" sx={{ fontSize: 40 }}
              onClick={leaveSession} />
          </div>
          <div>
            <div className='container video-container' 
              // style={{margin:'50px', padding:'40px'}}
            >
              <div className='row d-flex justify-content-center'>
                {publisher !== undefined ? (
                  <div className="stream-container col-md-6 col-xs-5" id="stream-container" onClick={() => handleMainVideoStream(publisher)}>
                    <UserVideoComponent
                      streamManager={publisher} />
                  </div>
                ) : null}
                {subscribers.map((sub, i) => (
                  <div key={sub.id} className="stream-container col-md-6 col-xs-5" id="stream-container" onClick={() => handleMainVideoStream(sub)}>
                    <span>{sub.id}</span>
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}


export default Untact;