import React, { useState, useEffect } from 'react';

function MyCameraOption({ selectedVideoSource, onSelectedVideoChange, selectedAudioSource, onSelectedAudioChange, myVideoRef }) {
  const [audioInputDevices, setAudioInputDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedAudioOutput, setSelectedAudioOutput] = useState('');

  useEffect(() => {
    // 오디오, 비디오 장치 정보 불러오기
    // 처음 렌더링 될 때만 실행되게 [] 넣어줌
    // gotDevices함수 호출
    navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
  }, []);

  // gotDevices 에러났을 때 
  function handleError(error) {
    console.log('navigator.mediaDevices.getUserMedia error: ', error.message, error.name);
  }

  // 오디오, 비디오 장치 정보 추가
  function gotDevices(deviceInfos) {
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
  function attachSinkId(element, sinkId) {
    if (typeof element.sinkId !== 'undefined') {
      element.setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
        })
        .catch(error => {
          let errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to the first output device in the list as it's the default.
          setSelectedAudioOutput(audioOutputDevices.length > 0 ? audioOutputDevices[0].value : '');
        });
    } else {
      console.warn('Browser does not support output device selection.');
    }
  }


  return (
    <div>
      <div className="select" style={{ marginBottom: '10px'}}>
        <label htmlFor="audioSource">마이크: </label>
        <select
          id="audioSource"
          value={selectedAudioSource}
          onChange={(e) => {
          // onSelectedAudioChange는 부모 컴포넌트(MyCameraOption)로부터 넘겨받은 함수
          // selectedAudioSource값 변경
            onSelectedAudioChange(e.target.value)
        }}
        >
          <option value="">장치를 선택하세요</option>
          <option value="no-audio">사용안함</option>
          {audioInputDevices.map(device => (
            <option key={device.value} value={device.value}>
              {device.text}
            </option>
          ))}
        </select>
      </div>

      <div className="select" style={{ marginBottom: '10px'}}>
        <label htmlFor="audioOutput">스피커: </label>
        <select
          id="audioOutput"
          value={selectedAudioOutput}
          onChange={(e) => {
            setSelectedAudioOutput(e.target.value)
            attachSinkId(myVideoRef.current, selectedAudioOutput)
        }}
        >
          <option value="">장치를 선택하세요</option>
          <option value="no-audio">사용안함</option> 
          {audioOutputDevices.map(device => (
            <option key={device.value} value={device.value}>
              {device.text}
            </option>
          ))}
        </select>
      </div>

      <div className="select" style={{ marginBottom: '10px'}}>
        <label htmlFor="videoSource">카메라: </label>
        <select
          id="videoSource"
          value={selectedVideoSource}
            onChange={(e) => {
          // setSelectedVideoChange는 부모 컴포넌트(MyCameraOption)로부터 넘겨받은 함수
          // selectedVideoSource값 변경
            onSelectedVideoChange(e.target.value); 
          }}
        >
          <option value="">장치를 선택하세요</option>
          <option value="no-camera">사용안함</option> 
          {videoDevices.map(device => (
            <option key={device.value} value={device.value}>
              {device.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default MyCameraOption;