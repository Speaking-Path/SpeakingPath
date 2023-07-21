import React, { useState, useEffect, useRef } from 'react';

// function MyCameraOption() {
function MyCameraOption({ selectedVideoSource, onSelectedVideoChange, selectedAudioSource, onSelectedAudioChange }) {
  const [audioInputDevices, setAudioInputDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedAudioInput, setSelectedAudioInput] = useState('');
  const [selectedAudioOutput, setSelectedAudioOutput] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');

  const videoRef = useRef(null);

  useEffect(() => {
    // Get the list of media devices (audio and video)
    navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
  }, []);

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

    setAudioInputDevices(audioInputs);
    setAudioOutputDevices(audioOutputs);
    setVideoDevices(videos);
  }

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

  function changeAudioDestination() {
    const audioDestination = selectedAudioOutput;
    attachSinkId(videoRef.current, audioDestination);
  }

  function gotStream(stream) {
    // You can do something with the stream here if needed.
    // For example, you can set the stream to a video element for display.
    videoRef.current.srcObject = stream;
  }

  function handleError(error) {
    console.log('navigator.mediaDevices.getUserMedia error: ', error.message, error.name);
  }

  function start() {
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }

    const audioSource = selectedAudioInput;
    const videoSource = selectedVideo;
    const constraints = {
      audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
      video: { deviceId: videoSource ? { exact: videoSource } : undefined },
    };

    if (videoSource === 'no-camera') {
        // If "No Camera" option is selected, don't request video stream.
        constraints.video = false;
    }

    if (audioSource === 'no-audio') {
        // If "No Camera" option is selected, don't request video stream.
        constraints.audio = false;
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(gotStream)
      .catch(handleError);
  }

  useEffect(() => {
    start();
  }, [selectedAudioInput, selectedVideo]);

  return (
    <div>
      <div className="select">
        <label htmlFor="audioSource">Audio input source: </label>
        <select
          id="audioSource"
          value={selectedAudioInput}
          onChange={(e) => {
            setSelectedAudioInput(e.target.value)
            onSelectedAudioChange(e.target.value)
        }}
        >
          <option value="">Select an audio input device</option>
          <option value="no-audio">No Audio</option>
          {audioInputDevices.map(device => (
            <option key={device.value} value={device.value}>
              {device.text}
            </option>
          ))}
        </select>
      </div>

      <div className="select">
        <label htmlFor="audioOutput">Audio output destination: </label>
        <select
          id="audioOutput"
          value={selectedAudioOutput}
          onChange={(e) => {
            setSelectedAudioOutput(e.target.value)
            onSelectedAudioChange(e.target.value);
        }}
        >
          <option value="">Select an audio output device</option>
          <option value="no-audio">No Audio</option> 
          {audioOutputDevices.map(device => (
            <option key={device.value} value={device.value}>
              {device.text}
            </option>
          ))}
        </select>
      </div>

      <div className="select">
        <label htmlFor="videoSource">Video source: </label>
        <select
          id="videoSource"
          value={selectedVideo}
        //   onChange={(e) => setSelectedVideo(e.target.value)}
            onChange={(e) => {
            setSelectedVideo(e.target.value);
            onSelectedVideoChange(e.target.value); // 선택한 비디오 소스를 부모 컴포넌트에 전달
          }}
        >
          <option value="">Select a video source</option>
          <option value="no-camera">No Camera</option> 
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


// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// export default MyCameraOption;

// import React, { useEffect } from 'react';
// import './MyCameraOption.module.css'

// function MyCameraOption() { 

//     return(
//         <div>
//             <div className="select">
//             <label for="audioSource">Audio input source: </label><select id="audioSource"></select>
//             </div>

//             <div className="select">
//                 <label for="audioOutput">Audio output destination: </label><select id="audioOutput"></select>
//             </div>

//             <div className="select">
//                 <label for="videoSource">Video source: </label><select id="videoSource"></select>
//             </div>
//         </div>
//     )
// }

// export default MyCameraOption;
