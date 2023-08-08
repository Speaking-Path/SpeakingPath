import React, { useState, useCallback } from "react";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import styles from "./VoiceRecording.module.css"
import GraphicEqSharpIcon from '@mui/icons-material/GraphicEqSharp';
import { grey } from "@mui/material/colors";



const VoiceRecording = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 10) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl));
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
    // console.log(sound); // File 정보 출력
  }, [audioUrl]);



  return (
    <>
      <div className={styles.recordingBox}>
        {
          onRec ?
            <div className={styles.recstartIcon}>
              <MicIcon sx={{ fontSize: 50, color: grey[100] }}
                onClick={() => { onRecAudio() }} />
              <p>녹음하기</p>
            </div> :
            <div className={styles.recstopIcon} >
              <GraphicEqSharpIcon sx={{ fontSize: 50, color: grey[100] }}
                onClick={() => { offRecAudio() }} />
              <p>녹음 멈추기</p>
            </div>
        }
      </div>
      <button onClick={onSubmitAudioFile}>정답 확인하기</button>
    </>
  );
};

export default VoiceRecording;