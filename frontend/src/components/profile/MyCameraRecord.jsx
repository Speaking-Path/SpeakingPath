import React, { useState } from 'react';

function MyCameraRecord() {
  const [recording, setRecording] = useState(false);
  let mediaRecorder;
  let recordedBlobs = [];

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//   function startRecording() {
//     recordedBlobs = [];
//     const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
//     const options = {mimeType};
  
//     try {
//       mediaRecorder = new MediaRecorder(window.stream, options);
//     } catch (e) {
//       console.error('Exception while creating MediaRecorder:', e);
//       errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
//       return;
//     }
  
//     console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
//     recordButton.textContent = 'Stop Recording';
//     playButton.disabled = true;
//     downloadButton.disabled = true;
//     codecPreferences.disabled = true;
//     mediaRecorder.onstop = (event) => {
//       console.log('Recorder stopped: ', event);
//       console.log('Recorded Blobs: ', recordedBlobs);
//     };
//     mediaRecorder.ondataavailable = handleDataAvailable;
//     mediaRecorder.start();
//     console.log('MediaRecorder started', mediaRecorder);
//   }
  
//   function stopRecording() {
//     mediaRecorder.stop();
//   }
//   ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 녹화 버튼 클릭 시 호출되는 함수
  const handleRecordButtonClick = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  // 재생 버튼 클릭 시 호출되는 함수
  const handlePlayButtonClick = () => {
    // 재생 기능 구현
  };


  return (
    <div>
      <video id="recorded" playsInline loop></video>

      <div>
        <button id="record" onClick={handleRecordButtonClick} disabled={recording}>
          {recording ? '녹화 중지' : '녹화 시작'}
        </button>
        <button id="play" onClick={handlePlayButtonClick} disabled>
          재생
        </button>
      </div>

      <div>
        <span id="errorMsg"></span>
      </div>
    </div>
  );
}

export default MyCameraRecord;
