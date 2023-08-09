import React, { useState, useRef, useEffect } from 'react';
import styles from './Preview.module.css';
import MyCamera from './MyCamera';
import MyCameraOption from './MyCameraOption';
import './ButtonStyles.scss'; 
import { useSelector } from 'react-redux';
import { selectMediaConfig } from '../../store/mediaConfig';

const Preview = ({ isOpen, onClose, children, size }) => {
  // 하위 컴포넌트 MyCameraOption, MyCamera에서 모두 사용되는 것들을 상위 컴포넌트에서 정의함

  // 선택된 비디오와 마이크 정보
  const [recording, setRecording] = useState(false);

  // myVideoRef에는 비디오, 마이크 정보가 담겨있음, https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  // 내가 선택한 값으로 변경될 때마다 DOM에 저장 
  const myVideoRef = useRef(null);
  const recordButtonRef = useRef(null);
  const playButtonRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedBlobsRef = useRef([]);

  const mediaConfig = useSelector(selectMediaConfig);
  
  useEffect(()=>{
    playButtonRef.current.disabled=true;
    playButtonRef.current.style.display = 'none'; // 처음 화면 실행 시 재생 버튼 숨김
  },[])

  // Open상태가 아니면 null값 반환
  if (!isOpen) return null;

  // 닫기 버튼을 누르면 카메라 중지
  function stopCamera() {
    const stream = myVideoRef.current?.srcObject;
    if (stream) {
      console.log("stopCamera")
      stream.getTracks().forEach((track) => track.stop());
    }
  }

  function getSupportedMimeTypes() {
    const possibleTypes = [
      'video/webm;codecs=av1,opus',
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/mp4;codecs=h264,aac',
    ];
    return possibleTypes.filter(mimeType => {
      return MediaRecorder.isTypeSupported(mimeType);
    });
  }

  function startRecording() {
    recordedBlobsRef.current=[];
    const mimeType = getSupportedMimeTypes()[0].value;
    const options = { mimeType };

    try {
      mediaRecorderRef.current = new MediaRecorder(myVideoRef.current.srcObject, options);
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      return;
    }

    console.log('Created MediaRecorder', mediaRecorderRef.current, 'with options', options);
    playButtonRef.current.disabled = true;
    mediaRecorderRef.current.onstop = (event) => {
      console.log('Recorder stopped: ', event);
      console.log('Recorded Blobs: ', recordedBlobsRef.current);
    };
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.start();
    setRecording(true)
    console.log('MediaRecorder started', mediaRecorderRef.current);
  }
  
  function handleDataAvailable(event) {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
      recordedBlobsRef.current.push(event.data);
    }
  }


  //-----------------토글 버튼----------------------------------//
  function handleRecordButtonClick() {
    if (recording === false) {
      const selectedVideo = mediaConfig.camera; // Redux 상태에서 선택된 카메라 정보 가져오기

      if (selectedVideo === null || selectedVideo === 'no-camera') {
        alert("녹화할 카메라 장치를 선택해주세요 📸");
        return;
      }
  
      startRecording();
      setRecording(true);
      toggleButtonClass(recordButtonRef.current);
      playButtonRef.current.style.display = 'none'; // 녹화 중일 때 재생 버튼 숨김
    } else {
      stopRecording();
      setRecording(false);
      playButtonRef.current.disabled = false;
      toggleButtonClass(recordButtonRef.current);
      playButtonRef.current.style.display = 'block'; // 녹화 중지 후 재생 버튼 표시
    }
  }


  function toggleButtonClass(button) {
    if (button.classList.contains('playing')) {
      button.classList.remove('paused', 'playing');
      button.classList.add('paused');
    } else {
      if (button.classList.contains('paused')) {
        button.classList.add('playing');
      }
    }
    if (!button.classList.contains('paused')) {
      button.classList.add('paused');
    }
  }
  // -------------------------------------------------- //

  
  function stopRecording(){
    mediaRecorderRef.current.stop();
    setRecording(false)
  }

  function handlePlayButtonClick(){
    console.log("play button clicked")
    const mimeType = getSupportedMimeTypes()[0].value;
    const superBuffer = new Blob(recordedBlobsRef.current, {type: mimeType});
    const mystream=myVideoRef.current.srcObject;
    myVideoRef.current.src = null;
    myVideoRef.current.srcObject = null;
    myVideoRef.current.src = window.URL.createObjectURL(superBuffer);
    console.log("recorded video start")
    myVideoRef.current.play();
    myVideoRef.current.muted = false; // 녹화파일 재생시엔 소리 ON
    myVideoRef.current.onended = (event) =>{
      console.log("recorded video end")
      if(myVideoRef.current){
        myVideoRef.current.src = null;
        myVideoRef.current.srcObject=mystream;
        myVideoRef.current.muted = true; // 에코 방지
      }
    }
  }

  return (
    <div className={styles.preview}>
      <div className={`${styles.previewContent} ${size === 'large' ? styles.large : ''}`}>
        {children}

        <div className="button-container" style={{ display: 'flex' }}>
          {/* 녹화/중지 버튼 */}
          <button
            id="record"
            className={`start-pause-button ${recording ? 'playing' : ''} ${recording === false ? 'paused' : ''}`}
            onClick={handleRecordButtonClick}
            ref={recordButtonRef}
          >

            {recording ? (
              <>
                <i>중지</i>
                <i>.</i>
              </>
            ) : (
              <>
                <i>녹화</i>
                <i>.</i>
              </>
            )}
          </button>
          
          {/* 재생 버튼 */}
          <button
            id="play"
            onClick={handlePlayButtonClick}
            ref={playButtonRef}
            className="btn btn-primary fw-bolder"
            style={{ background: '#6D58FF', color: 'white', borderRadius: '20px', marginLeft: '10px' }}
          >
            <i class="bi bi-play-fill"></i>
          </button>
        </div>


        <MyCamera
          myVideoRef={myVideoRef}
        />
        <MyCameraOption
        />

        <div>
          <button
            className="btn btn-primary fw-bolder m-2"
            onClick={() => { onClose(); stopCamera(); }}
            style={{ background: '#6D58FF', color: 'white' }}
          >닫기</button>

        </div>
      </div>
    </div>
  );
};

export default Preview;

