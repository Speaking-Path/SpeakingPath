import React, { useState } from 'react';

function MyCameraRecord() {
  const [recording, setRecording] = useState(false);
  let mediaRecorder;
  let recordedBlobs = [];

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
