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
import Preview from '../profile/Preview';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';


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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const location = useLocation();

  const tokenType = localStorage.getItem('tokenType')
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    window.scrollTo({ top: 150, behavior: 'smooth' }); 

    setMyUserName(userId);
    if(location.state.sessionId!==undefined){
      setMySessionId(location.state.sessionId);
    }

    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  const handleButtonClick = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

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
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `${tokenType} ${accessToken}`
      },
    });
    return response.data;
  }

  const createToken = async (sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `${tokenType} ${accessToken}`
      },
    });
    return response.data;
  }

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // 배경 이미지
  const background = {
    //width: '100vw',
    height: '110vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    //maxWidth: '50vw',
  };

  if (session === undefined) {
    background.backgroundImage = `url(${process.env.PUBLIC_URL}/assets/conference/conference.jpg)`;
    background.backgroundSize = 'auto 100%';
    // backgroundSize: '60vw 100vh',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center'
  } else {
    background.backgroundImage = `url(${process.env.PUBLIC_URL}/assets/conference/conference2.jpg)`;
    background.backgroundSize = 'cover';
  }


  return (
    <div id="box" style={background}>
      <div>
        {session === undefined ? (
          <div id="join" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px'}}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* <button className='btn btn-primary btn-lg px-5 py-3 fs-6 fw-bolder m-5' style={{ background: 'linear-gradient(45deg, #007bff, #6610f2)' }}
              onClick={joinSession}> 입장하기 </button> */}
              <button className="btn btn-primary btn-lg px-5 py-3 fs-6 fw-bolder m-2" style={{ background: 'linear-gradient(45deg, #007bff, #6610f2)', color: 'white' }} onClick={joinSession}> 입장하기 </button>
              <button type="button" className="btn btn-outline-primary btn-lg px-5 py-3 fs-6 fw-bolder m-2" onClick={handleButtonClick}>화면 미리보기</button>
            </div>
          </div>
        ) : null}
      </div>

    {/* 화면 미리보기 */}
    {isPreviewOpen && (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
          <Preview isOpen={isPreviewOpen} onClose={handleClosePreview} size="large">
          </Preview>
      </div>
      )}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
                <div style={{display: 'flex',  justifyContent: 'left', alignItems: 'center', marginLeft: '15%', cursor: 'pointer', fontSize: '1.5rem',  fontWeight: '700',  marginLeft: '10px', padding: '30px' }} onClick={leaveSession}>
                    <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40}} /><span style={{margin: '10px'}}>종료하기</span>
                </div>
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