import React, { useState, useRef } from 'react';
import styles from './Preview.module.css';
import MyCamera from './MyCamera';
import MyCameraOption from './MyCameraOption';
import MyCameraRecord from './MyCameraRecord';

const Preview = ({ isOpen, onClose, children, size }) => {
  // 하위 컴포넌트 MyCameraOption, MyCamera에서 모두 사용되는 것들을 상위 컴포넌트에서 정의함
  const [selectedVideoSource, setSelectedVideoSource] = useState(''); // 비디오
  const [selectedAudioSource, setSelectedAudioSource] = useState(''); // 마이크
  const myVideoRef = useRef(null); // myVideoRef에는 비디오, 마이크 정보가 담겨있음, https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  // 내가 선택한 값으로 변경될 때마다 DOM에 저장 
  if (!isOpen) return null;

  function stopCamera() {
    const stream = myVideoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }

  return (
    <div className={styles.preview}>
      <div className={`${styles.previewContent} ${size === 'large' ? styles.large : ''}`}>
        {children}
        <MyCamera
          selectedVideoSource={selectedVideoSource}
          selectedAudioSource={selectedAudioSource}
          myVideoRef={myVideoRef}
        />
        <MyCameraOption
          selectedVideoSource={selectedVideoSource} // 변수 넘겨주기
          // setSelectedVideoSource함수를 사용하지 않으면 selectedVideoSource변수를 렌더링할 수 없음
          onSelectedVideoChange={setSelectedVideoSource} // 함수 넘겨주기
          selectedAudioSource={selectedAudioSource} // 변수 넘겨주기
          onSelectedAudioChange={setSelectedAudioSource} // 함수 넘겨주기
          myVideoRef={myVideoRef}
        />
        <MyCameraRecord />
        <div>
          {/* <button onClick={onClose}>닫기</button> */}
          <button onClick={() => { onClose(); stopCamera(); }}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default Preview;

