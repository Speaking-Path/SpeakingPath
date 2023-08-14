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
import Loading from './Loading';


const VoiceRecording = ({answer, setVoiceAnswer}) => {
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    // const sttServer = axios.create({ baseURL: "http://localhost:5001" })
    try {
      // Convert Blob to Base64 string
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);

      reader.onload = async () => {
        const base64Audio = reader.result.split(',')[1]; // Extract base64 data

        // Send Base64 audio to the server
        const sttServer = axios.create({ baseURL: "https://i9c109.p.ssafy.io:5001" });
        const response = await sttServer.post('/stt/result', {
          file: base64Audio,
          answer: answer.objName,
          // format: 'pcm'
        });

        console.log(response.data.result); // 여기에 음성인식 결과가 출력됩니다!!
        console.log(response.data.predict);
        console.log(response.data.accuracy);
        setVoiceAnswer(response.data.result)
        setIsLoading(false)
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
      {
        isLoading ? (
          <Loading/>
        ) : null
      }
    </>
  );
};

export default VoiceRecording;
