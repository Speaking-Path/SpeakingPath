import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React from 'react';
import './Untact.css';
import UserVideoComponent from './UserVideoComponent';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect, useState } from 'react';
// import { getToken, createSession, createToken } from './getToken';


const APPLICATION_SERVER_URL = process.env.REACT_APP_OPENVIDU 

const Untact = () => {
  const [mySessionId, setMySessionId] = useState(undefined);
  const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);



  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);

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
      mySession.publish(publisher);
  
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
    return response.data;
  }
  
  const createToken = async (sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
      headers: { 'Content-Type': 'application/json', },
    });
    return response.data;
  }

  return (
    <div id="box">
      {session === undefined ? (
        <div id="join">
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <HighlightOffIcon id="closeIcon" color="white" sx={{ fontSize: 40 }}
              onClick={leaveSession} />
          </div>
          <div>
            <div className='container'>
              <div className='row d-flex justify-content-center'>
                {publisher !== undefined ? (
                  <div className="stream-container col-md-5 col-xs-5" id="stream-container" onClick={() => handleMainVideoStream(publisher)}>
                    <UserVideoComponent
                      streamManager={publisher} />
                  </div>
                ) : null}
                {subscribers.map((sub, i) => (
                  <div key={sub.id} className="stream-container col-md-5 col-xs-5" id="stream-container" onClick={() => handleMainVideoStream(sub)}>
                    <span>{sub.id}</span>
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={leaveSession}>나가기</button>
        </div>
      ) : null}
    </div>
  );
}


export default Untact;