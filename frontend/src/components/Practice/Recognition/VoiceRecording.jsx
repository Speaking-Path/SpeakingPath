// import React, { useState, useCallback } from "react";
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import styles from "./VoiceRecording.module.css"
// import GraphicEqSharpIcon from '@mui/icons-material/GraphicEqSharp';
// import { grey } from "@mui/material/colors";



// const VoiceRecording = () => {
//   const [stream, setStream] = useState();
//   const [media, setMedia] = useState();
//   const [onRec, setOnRec] = useState(true);
//   const [source, setSource] = useState();
//   const [analyser, setAnalyser] = useState();
//   const [audioUrl, setAudioUrl] = useState();

//   const onRecAudio = () => {
//     // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
//     const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//     // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
//     const analyser = audioCtx.createScriptProcessor(0, 1, 1);
//     setAnalyser(analyser);

//     function makeSound(stream) {
//       // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
//       const source = audioCtx.createMediaStreamSource(stream);
//       setSource(source);
//       source.connect(analyser);
//       analyser.connect(audioCtx.destination);
//     }
//     // 마이크 사용 권한 획득
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorder.start();
//       setStream(stream);
//       setMedia(mediaRecorder);
//       makeSound(stream);

//       analyser.onaudioprocess = function (e) {
//         if (e.playbackTime > 10) {
//           stream.getAudioTracks().forEach(function (track) {
//             track.stop();
//           });
//           mediaRecorder.stop();
//           analyser.disconnect();
//           audioCtx.createMediaStreamSource(stream).disconnect();

//           mediaRecorder.ondataavailable = function (e) {
//             setAudioUrl(e.data);
//             setOnRec(true);
//           };
//         } else {
//           setOnRec(false);
//         }
//       };
//     });
//   };

//   // 사용자가 음성 녹음을 중지했을 때
//   const offRecAudio = () => {
//     // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
//     media.ondataavailable = function (e) {
//       setAudioUrl(e.data);
//       setOnRec(true);
//     };

//     // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
//     stream.getAudioTracks().forEach(function (track) {
//       track.stop();
//     });

//     // 미디어 캡처 중지
//     media.stop();
//     // 메서드가 호출 된 노드 연결 해제
//     analyser.disconnect();
//     source.disconnect();
//   };

//   const onSubmitAudioFile = useCallback(() => {
//     if (audioUrl) {
//       console.log(URL.createObjectURL(audioUrl));
//     }
//     // File 생성자를 사용해 파일로 변환
//     const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
//     // console.log(sound); // File 정보 출력
//   }, [audioUrl]);



//   return (
//     <>
//       <div className={styles.recordingBox}>
//         {
//           onRec ?
//             <div className={styles.recstartIcon}>
//               <MicIcon sx={{ fontSize: 50, color: grey[100] }}
//                 onClick={() => { onRecAudio() }} />
//               <p>녹음하기</p>
//             </div> :
//             <div className={styles.recstopIcon} >
//               <GraphicEqSharpIcon sx={{ fontSize: 50, color: grey[100] }}
//                 onClick={() => { offRecAudio() }} />
//               <p>녹음 멈추기</p>
//             </div>
//         }
//       </div>
//       <button onClick={onSubmitAudioFile}>정답 확인하기</button>
//     </>
//   );
// };

// export default VoiceRecording;

import React, { useState, useEffect } from 'react';
import RecorderJS from 'recorder-js';
import MicIcon from '@mui/icons-material/Mic';
import styles from "./VoiceRecording.module.css"
import GraphicEqSharpIcon from '@mui/icons-material/GraphicEqSharp';
import { grey } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';


import { getAudioStream, exportBuffer } from './audio';
import axios from 'axios';
import { Route } from 'react-router-dom';


const VoiceRecording = () => {
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    async function initializeAudioStream() {
      try {
        const audioStream = await getAudioStream();
        setStream(audioStream);
      } catch (error) {
        // Handle error here.
        console.log(error);
      }
    }
    initializeAudioStream();
  }, []);

  const startRecord = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const newRecorder = new RecorderJS(audioContext);
    newRecorder.init(stream);
    setRecorder(newRecorder);

    newRecorder.start();
    setRecording(true);
  };

  const stopRecord = async () => {
    if (recorder) {
      const { buffer } = await recorder.stop();
      const audio = exportBuffer(buffer[0]);
      setAudioBlob(audio);
      // Process the audio here.
      const url = URL.createObjectURL(audio);
      // setAudioUrl(url);
      setRecording(false);
    }
  };

  const sendAudioToServer = async () => {
    // const sttServer = axios.create({ baseURL: "http://localhost:5001" })
    try {
      // Convert Blob to Base64 string
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);

      reader.onload = async () => {
        const base64Audio = reader.result.split(',')[1]; // Extract base64 data

        // Send Base64 audio to the server
        // const sttServer = axios.create({ baseURL: "https://i9c109.p.ssafy.io" });
        const response = await axios.post(process.env.PUBLIC_URL+'/stt/result', {
          file: base64Audio,
          // format: 'pcm'
        });

        console.log(response.data.result); // 여기에 음성인식 결과가 출력됩니다!!
        console.log(response.data.predict);
        console.log(response.data.accuracy);
      };
    } catch {
      navigate('/error', { message: "잘못된 접근입니다." }); // 에러 발생 시 ErrorPage로 리다이렉트
    }
    // console.log(audioBlob)

  };

  if (!stream) {
    return null;
  }

  return (
    <>
      <div className={styles.recordingBox}>
        {
          recording ?
            <div className={styles.recstopIcon} >
              <GraphicEqSharpIcon sx={{ fontSize: 50, color: grey[100] }}
                onClick={() => { stopRecord() }} />
              <p>녹음 멈추기</p>
            </div> :
            <div className={styles.recstartIcon}>
              <MicIcon sx={{ fontSize: 50, color: grey[100] }}
                onClick={() => { startRecord() }} />
              <p>녹음하기</p>
            </div>
        }
      </div>
      <button className={`${styles.button} ${styles.buttonWinona} ${styles.buttonBorderThin} ${styles.buttonRoundS}`}
      onClick={sendAudioToServer} data-text="정답 확인하기"><span>정답 확인하기</span></button>
    </>
  );
};

export default VoiceRecording;
