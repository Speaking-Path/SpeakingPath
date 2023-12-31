import React, { useState, useEffect } from 'react';
import { setCamera, setMicrophone, setSpeaker, selectMediaConfig } from '../../store/mediaConfig';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function MyCameraOption() {
  // 장치 정보들을 담는 변수
  const [audioInputDevices, setAudioInputDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);

  const mediaConfig=useSelector(selectMediaConfig)
  const dispatch=useDispatch()

  const selectedMicrophone = mediaConfig.microphone;
  const selectedSpeaker = mediaConfig.speaker;
  const selectedCamera = mediaConfig.camera;

  useEffect(() => {
    // 오디오, 비디오 장치 정보 불러오기
    // 처음 렌더링 될 때만 실행되게 [] 넣어줌
    // gotDevices함수 호출
    async function getDivices(){
      await navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
    }
    getDivices()
  }, []);

  // gotDevices 에러났을 때 
  function handleError(error) {
    console.log('navigator.mediaDevices.getUserMedia error: ', error.message, error.name);
  }

  // 오디오, 비디오 장치 정보 추가
  function gotDevices(deviceInfos) {
    console.log(deviceInfos)
    const audioInputs = [];
    const audioOutputs = [];
    const videos = [];

    for (let i = 0; i < deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      const option = { value: deviceInfo.deviceId, text: deviceInfo.label };

      if (deviceInfo.kind === 'audioinput') {
        audioInputs.push(option);
      } else if (deviceInfo.kind === 'audiooutput') {
        audioOutputs.push(option);
      } else if (deviceInfo.kind === 'videoinput') {
        videos.push(option);
      }
    }
    // 오디오, 비디오 장치 목록 useState에 저장
    setAudioInputDevices(audioInputs);
    setAudioOutputDevices(audioOutputs);
    setVideoDevices(videos);
  }

  // myVideoRef.current에 카메라와 마이크 정보가 담겨있는데,
  // 내가 설정한 오디오 출력 장치(selectedAudioOutput)에 이 정보를 담는 것
  // function attachSinkId(element, sinkId) {
  //   // if (typeof element.sinkId !== 'undefined') {
  //   //   if (sinkId === 'no-speaker') {
  //   //     // element.setSinkId(null) 
  //   //     try{
  //   //       element.muted = true  // 음소거 설정
  //   //       console.log('Success, audio output device detached.');
  //   //     }catch(error){
  //   //       console.error('Error detaching audio output device:', error);
  //   //     }
  //   //   } else {
  //   //       element.setSinkId(sinkId)
  //   //         .then(() => {
  //   //           element.muted = false
  //   //           console.log(`Success, audio output device attached: ${sinkId}`);
  //   //         })
  //   //         .catch(error => {
  //   //           let errorMessage = error;
  //   //           if (error.name === 'SecurityError') {
  //   //             errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
  //   //           }
  //   //           console.error(errorMessage);
  //   //           // Jump back to the first output device in the list as it's the default.
  //   //           setSelectedAudioOutput(audioOutputDevices.length > 0 ? audioOutputDevices[0].value : '');
  //   //         });
  //   //       }
  //   //   } else {
  //   //     console.warn('Browser does not support output device selection.');
  //   //   }

  //   //  attachSinkId 함수에서 'no-speaker' 옵션 없애고 다시 작성.
  //   // 녹화된 영상에서는 소리가 나와서 추가적인 코드를 작성해야 하고, 스피커가 필요한 서비스이기 때문에 생략 
  //     if (typeof element.sinkId == 'undefined') {
  //       element.setSinkId(sinkId)
  //           .then(() => {
  //             element.muted = false
  //             console.log(`Success, audio output device attached: ${sinkId}`);
  //           })
  //           .catch(error => {
  //             let errorMessage = error;
  //             if (error.name === 'SecurityError') {
  //               errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
  //             }
  //             console.error(errorMessage);
  //             // Jump back to the first output device in the list as it's the default.
  //             setSelectedAudioOutput(audioOutputDevices.length > 0 ? audioOutputDevices[0].value : '');
  //           });
  //         } else {
  //       console.warn('Browser does not support output device selection.');
  //   }
  // }


  //   // 마이크, 카메라 모두 off가 불가능하기 때문에, 이미 다른 하나의 값이 off일 경우 값변경을 하지 않고 안내메세지 출력하도록 함
  //   // 마이크 값이 바뀌었을 때 호출
  //   function handleAudioInputChange(e) {
  //     const value = e.target.value;
  //     if (value === 'no-microphone' && selectedVideo === 'no-camera') {
  //       alert('마이크 또는 카메라 중 적어도 하나를 선택해주세요.');
  //       // 이전 선택값으로 돌아가도록 선택값 초기화
  //       setSelectedAudioInput(selectedAudioInput);
  //     } else {
  //       // 둘 모두 off가 아니면 선택값으로 변경
  //       // setSelectedAudioInput은 부모 컴포넌트(MyCameraOption)로부터 넘겨받은 함수
  //       // selectedAudioInput값 변경
  //       setSelectedAudioInput(value);
  //     }
  //   }

  //   // 카메라 값이 바뀌었을 때 호출 
  //   function handleVideoChange(e) {
  //     const value = e.target.value;
  //     if (value === 'no-camera' && selectedAudioInput === 'no-microphone') {
  //       alert('마이크 또는 카메라 중 적어도 하나를 선택해주세요.');
  //       // 이전 선택값으로 돌아가도록 선택값 초기화
  //       setSelectedVideo(selectedVideo);
  //     } else {
  //       // 둘 모두 off가 아니면 선택값으로 변경
  //       // setSelectedVideo는 부모 컴포넌트(MyCameraOption)로부터 넘겨받은 함수
  //       // selectedVideo값 변경
  //       setSelectedVideo(value);
  //     }
  //   }


  return (
    <div className='devices-select' style={{ display: 'flex', justifyContent:'center' }}>

      {/* 마이크 선택 */}
        <div className="select" style={{ marginBottom: '10px', padding: '3px' }}>
          <label htmlFor="audioInput"> <i class="bi bi-mic-fill"></i> </label>
          <DropdownButton
            id="audioInput"
            title="마이크 선택"
            variant='secondary'
            onSelect={(value) => { dispatch(setMicrophone(value)); }}
          >
            {audioInputDevices.map(device => (
              <Dropdown.Item 
                key={device.value} 
                eventKey={device.value}
                className={selectedMicrophone === device.value ? 'selected-option' : ''}
                >
                {device.text}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>


        {/* 스피커 선택 */}
        <div className="select" style={{ marginBottom: '10px', padding: '3px' }}>
          <label htmlFor="audioOutput"> <i class="bi bi-megaphone-fill"></i> </label>
          <DropdownButton
            className={selectedSpeaker ? 'selected-option' : ''}
            id="audioOutput"
            title="스피커 선택"
            variant='secondary'
            onSelect={(value) => { dispatch(setSpeaker(value)); }}
          >
            {audioOutputDevices.map(device => (
              <Dropdown.Item key={device.value} eventKey={device.value}>
                {device.text}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>


        {/* 카메라 선택 */}
        <div className="select" style={{ marginBottom: '10px', padding: '3px' }}>
          <label htmlFor="videoSource"> <i class="bi bi-camera-fill"></i> </label>
          <DropdownButton
            id="videoSource"
            title="카메라 선택"
            variant='secondary'
            onSelect={(value) => { dispatch(setCamera(value)); }}
          >
            <Dropdown.Item eventKey="no-camera">사용안함</Dropdown.Item>
            {videoDevices.map(device => (
              <Dropdown.Item key={device.value} eventKey={device.value} className={selectedCamera === device.value ? 'selected-option' : ''}>
                {device.text}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>

    </div>
  );

}

export default MyCameraOption;


