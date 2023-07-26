import React, { useState, useRef } from 'react';
import styles from './Preview.module.css';
import MyCamera from './MyCamera';
import MyCameraOption from './MyCameraOption';
import MyCameraRecord from './MyCameraRecord';

const Preview = ({ isOpen, onClose, children, size }) => {
  // 하위 컴포넌트 MyCameraOption, MyCamera에서 모두 사용되는 것들을 상위 컴포넌트에서 정의함

  // 선택된 비디오와 마이크 정보
  const [selectedVideo, setSelectedVideo] = useState(''); // 비디오
  const [selectedAudioInput, setSelectedAudioInput] = useState(''); // 마이크

  // myVideoRef에는 비디오, 마이크 정보가 담겨있음, https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  // 내가 선택한 값으로 변경될 때마다 DOM에 저장 
  const myVideoRef = useRef(null); 

  // Open상태가 아니면 null값 반환
  if (!isOpen) return null;

  // 닫기 버튼을 누르면 카메라 중지
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
          selectedVideo={selectedVideo}
          selectedAudioInput={selectedAudioInput}
          myVideoRef={myVideoRef}
        />
        <MyCameraOption
          selectedVideo={selectedVideo} // 변수 넘겨주기
          // setSelectedVideoSource함수를 사용하지 않으면 selectedVideoSource변수를 렌더링할 수 없음
          setSelectedVideo={setSelectedVideo} // 함수 넘겨주기
          selectedAudioInput={selectedAudioInput} // 변수 넘겨주기
          setSelectedAudioInput={setSelectedAudioInput} // 함수 넘겨주기
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

