import { OpenVidu } from 'openvidu-browser';

import axios from 'axios';
import React, { Component } from 'react';
import './Untact.css';
// import './index.css'
import UserVideoComponent from './UserVideoComponent';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import styles from './Untact.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const APPLICATION_SERVER_URL = process.env.REACT_APP_OPENVIDU 

class Untact extends Component {
  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: undefined,
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,  // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
      sound: true,
      video: true,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  mute = async () => {
    const publisher = this.state.publisher
    publisher.publishAudio(false)
    this.setState({
      sound: false
    })
  }

  soundOn = async () => {
    const publisher = this.state.publisher
    publisher.publishAudio(true)
    this.setState({
      sound: true
    })
  }

  videoOff = async () => {
    const publisher = this.state.publisher
    publisher.publishVideo(false)
    this.setState({
      video: false
    })
  }

  videoOn = async () => {
    const publisher = this.state.publisher
    publisher.publishVideo(true)
    this.setState({
      video: true
    })
  }



  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---
    // 세션 초기화

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        // 세션에 있는 스트림 삭제될 경우
        mySession.on('streamDestroyed', (event) => {

          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        // 세션에서 발생하는 비동기 예외
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        // 유효한 토큰을 가져오기
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          // 두번째인자 : 사용자의 클라이언트데이터
          // 스트림에 접근할 때 사용, DOM에 사용자의 닉네임으로 추가
          mySession.connect(token, { clientData: this.state.myUserName })
            .then(async () => {

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              // 사용자의 카메라 스트림을 초기화
              // undefined를 넘겨주는 이유는 비디오 요소 삽입하지 않고 개발자가 직접 관리한다는 의미
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---
              // 사용자의 스트림 발행(발행한 스트림은 세션에 참여하는 다른 사용자들이 볼 수 있음)
              mySession.publish(publisher);

              // Obtain the current video device in use
              // 사용자의 디바이스 정보 얻어오기
              var devices = await this.OV.getDevices();
              // 비디오 입력 디바이스만 필터링
              var videoDevices = devices.filter(device => device.kind === 'videoinput');
              // 카메라 스트림에서 현재 사용중인 비디오 트랙의 디바이스 ID가져옴
              var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
              // 현재 사용중인 카메라 디바이스를 배열에서 찾아 저장
              var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

              // Set the main video in the page to display our webcam and store our Publisher
              // 현재 사용중인 디바이스 정보와 퍼블리셔를 컴포넌트 상태에 저장
              //  사용자의 카메라 스트림이 화면에 표시되고 관리되게 됨
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log('There was an error connecting to the session:', error.code, error.message);
            });
        });
      },
    );
  }

  leaveSession() {

    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    // 속성에서 세션 객체를 가져옴
    const mySession = this.state.session;

    // 세션 객체가 존재하는 경우에만 메서드를 호출하여 세션을 떠남
    // 사용자는 세션에서 스트림을 수신하거나 발행하는 것을 중지하고 다른 참가자들의 스트림을 더이상 받아보지않음
    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    // null로 설정하여 오픈비두 객체를 해제
    this.OV = null;
    // 컴포넌트 상태 초기화
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined
    });
  }


  async switchCamera() {
    try {
      // 사용 가능한 미디어 디바이스 목록을 얻어온다(배열로 반환)
      const devices = await this.OV.getDevices()
      // videoinput종류인 비디오 디바이스만 필터링하여 배열에 저장
      var videoDevices = devices.filter(device => device.kind === 'videoinput');

      // 사용 가능한 비디오 디바이스가 2개 이상인 경우에만 다음 동작 수행
      if (videoDevices && videoDevices.length > 1) {
        // 현재 사용중인 비디오 디바이스와 다른 디바이스들로 필터링하여 새 배열에 저장
        var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

        // 선택된 다른 디바이스가 존재하는 경우
        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          // 선택한 디바이스를 사용하여 새로운 퍼블리셔 객체 생성
          // 두번째 인자로 비디오 디바이스의 deviceId와 기타 옵션들 지정
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true
          });

          //newPublisher.once("accessAllowed", () => {
          // 현재 사용중인 웹캠 스트림을 발행중지
          await this.state.session.unpublish(this.state.mainStreamManager)

          // 새로운 스트림으로 전환
          await this.state.session.publish(newPublisher)
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div id="box">
        {/* 세션 없을 때 */}
        {this.state.session === undefined ? (
          <div id="join">
            <div id="join-dialog" className="jumbotron vertical-center">
              <h1> Join a video session </h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
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
                    onChange={this.handleChangeSessionId}
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

        {/* 세션 존재할경우 */}
        {this.state.session !== undefined ? (
          <div id="session">
            <div id="session-header">
              <HighlightOffIcon id="closeIcon" color="white" sx={{ fontSize: 40 }}
              onClick={this.leaveSession}/>

              {/* <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
              <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={this.switchCamera}
                value="Switch Camera"
           /> */}
            </div>
            <div>
              {/* {this.state.mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <UserVideoComponent streamManager={this.state.mainStreamManager} />
              </div>
            ) : null} */}
              <div className='container'>
                <div className='row d-flex justify-content-center'>
                  {this.state.publisher !== undefined ? (
                    <div className="stream-container col-md-5 col-xs-5" id="stream-container" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                      <UserVideoComponent
                        streamManager={this.state.publisher} />
                    </div>
                  ) : null}
                  {this.state.subscribers.map((sub, i) => (
                    <div key={sub.id} className="stream-container col-md-5 col-xs-5" id="stream-container" onClick={() => this.handleMainVideoStream(sub)}>
                      <span>{sub.id}</span>
                      <UserVideoComponent streamManager={sub} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <footer>
              <div className='container'>
              <div className='row'>
                <div className='col'>
                  {this.state.sound ?
                    <div onClick={this.mute}>
                      <VolumeOffIcon color="white" sx={{ fontSize: 40 }} />
                      <p id="iconMean">음소거</p>
                    </div> :
                    <div onClick={this.soundOn}>
                      <VolumeUpIcon color="white" sx={{ fontSize: 40 }} />
                      <p id="iconMean">소리 켜기</p>
                    </div>
                  }
                </div>
                <div className='col'>
                  {this.state.video ?
                    <div onClick={this.videoOff}>
                      <VideocamOffIcon color="white" sx={{ fontSize: 40 }} />
                      <p id="iconMean">비디오 끄기</p>
                    </div> :
                    <div onClick={this.videoOn}>
                      <VideocamIcon color="white" sx={{ fontSize: 40 }} />
                      <p id="iconMean">비디오 켜기</p>
                    </div>
                  }
                </div>
                <div className='col'>
                  <div className='row'>
                  <div className='col' onClick={this.switchCamera}>
                  <SwitchVideoIcon color="white" sx={{ fontSize: 40 }} />
                  <p id="iconMean">카메라 변경</p>
                  </div>
                  <div className='col'>
                  <VideoCameraFrontIcon color="white" sx={{ fontSize: 40 }} />
                  <p id="iconMean">녹화하기</p>
                  </div>
                  </div>
                </div>
              </div>
              </div>
            </footer>
          </div>
        ) : null}
      </div>
    );
  }


  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  // 서버로부터 세션 아이디 생성하고 세션아이디 사용하여 토큰 생성하는 비동기함수
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }
  // 서버로부터 새로운 세션을 생성하는 비동기 함수
  async createSession(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
      headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The sessionId
  }
  // 세션에 대한 토큰을 생성하는 비동기함수
  async createToken(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
      headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The token
  }
}

export default Untact;
