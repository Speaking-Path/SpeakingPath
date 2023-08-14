import MyCamera from "../../profile/MyCamera"
import { useRef, useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { selectMediaConfig } from '../../../store/mediaConfig.js';
import styles from "./PronStart.module.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { blue } from "@mui/material/colors";
import './PronStart.scss'

function PronStart(props) {
    // 전문가 영상 ref
    const guideVideoRef = useRef(null)
    // MyCamera에 전달될 ref
    const myVideoRef = useRef(null);
    // 문제들을 저장할 배열
    const pronData = useRef([])
    // 현재 문제 인덱스
    const [currentIndex, setCurrentIndex] = useState(0)

    const mediaConfig = useSelector(selectMediaConfig);
    const selectedCamera = mediaConfig.camera;
    const [recording, setRecording] = useState(false);
    const recordButtonRef = useRef(null);
    const playButtonRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedBlobsRef = useRef([]);
    const [guideVideoEnded, setGuideVideoEnded] = useState(false); // 가이드 비디오 재생이 끝났는지 여부 상태 추가


    const [showTimer, setShowTimer] = useState(true);


    // 원래 코드
    // useEffect(() => {
    //     getPronData()
    //     guideVideoRef.current.src=pronData.current.at(currentIndex).src
    //     if (selectedCamera !== 'no-camera') {
    //         myVideoRef.current.style = "height: 45vh;"
    //     }
    // }, [])


    // 타이머 테스트 코드
    // useEffect(() => {
    //     getPronData();
    //     if (selectedCamera !== 'no-camera') {
    //         myVideoRef.current.style = "height: 45vh;"
    //     }
    //     const playDelay = 5000; // 5초
    //     const playTimer = setTimeout(() => {
    //         const newIndex = (currentIndex + 1) % pronData.current.length;
    //         guideVideoRef.current.src = pronData.current[newIndex].src;
    //         setCurrentIndex(newIndex);
    //     }, playDelay);

    //     return () => {
    //         clearTimeout(playTimer); // 컴포넌트가 언마운트될 때 타이머 클리어
    //     };
    // }, [currentIndex]); // currentIndex가 변경될 때마다 실행

    
    useEffect(() => {
        getPronData();
        const newIndex = (currentIndex + 1) % pronData.current.length;
        setCurrentIndex(newIndex);
    }, []);

    useEffect(() => {
        if (!showTimer && !guideVideoEnded) {
            if (selectedCamera !== 'no-camera') {
                myVideoRef.current.style = "height: 45vh;";
            }
            
            if (guideVideoRef.current) {
                // guideVideoRef.current.src = pronData.current[newIndex].src;
                guideVideoRef.current.src=pronData.current.at(currentIndex).src
                
            }
            guideVideoRef.current.style = "height: 45vh; width: 40vw; transform: rotate(-2deg);";
        }
    }, [showTimer, selectedCamera, currentIndex]);

    useEffect(() => {
        if (showTimer) {
            const playDelay = 5000; // 5초
            const playTimer = setTimeout(() => {
                setShowTimer(false);
            }, playDelay);

            return () => {
                clearTimeout(playTimer);
            };
        }
    }, [showTimer]);


        // 가이드 비디오 재생 끝났을 때 녹화 시작
        useEffect(() => {
            // 가이드 비디오 재생이 끝났을 때의 이벤트 핸들러 등록
            guideVideoRef.current.addEventListener('ended', handleGuideVideoEnded);

            return () => {
                // 컴포넌트 언마운트 시에 이벤트 핸들러 제거
                guideVideoRef.current.removeEventListener('ended', handleGuideVideoEnded);
            };
        }, []); // 컴포넌트 마운트 시에만 실행


        // 가이드 비디오 재생이 끝났을 때 호출되는 함수
        function handleGuideVideoEnded() {
            setGuideVideoEnded(true); // 가이드 비디오 재생이 끝났음을 표시
            setShowTimer(true); 
        }
 

        useEffect(() => {
            getPronData();
            if (guideVideoEnded) {
                // 가이드 비디오 재생이 끝나면 5초 뒤에 녹화 시작 함수 호출
                const timer = setTimeout(() => {
                    startRecording();
                    setRecording(true);
                }, 5000); 

                return () => {
                    clearTimeout(timer);
                };
            }
        }, [guideVideoEnded]);





    // 데이터 받는 함수. 지금은 임시로 assets에 있는 동영상을 활용하고 나중에 BE api가 완성되면 대체
    function getPronData() {
        pronData.current = []
        let path=process.env.PUBLIC_URL + "/assets/sentence/"
        let nfile=5
        if(props.type==="syllable"){
            path=process.env.PUBLIC_URL + "/assets/syllable/"
            nfile=14
        }else if(props.type==="word"){
            path=process.env.PUBLIC_URL + "/assets/word/"
            nfile=0
        }else if(props.type==="sentence"){
            path=process.env.PUBLIC_URL + "/assets/sentence/"
            nfile=5
        }
        for (let i = 0; i < nfile; i++) {
            const data = {
                src: process.env.PUBLIC_URL + path + (i+1).toString()+".mp4",
            }
            pronData.current.push(data)
        }
        console.log(pronData.current)
    }

    // 다음 문제로
    function Next(){
        const newIndex=(currentIndex+1)%pronData.current.length
        guideVideoRef.current.src=pronData.current.at(newIndex).src
        setCurrentIndex(newIndex)
    }

    // 이전 문제로
    function Prev(){
        const newIndex=(currentIndex-1)%pronData.current.length
        guideVideoRef.current.src=pronData.current.at(newIndex).src
        setCurrentIndex(newIndex)
    }

    // 이전 페이지
    const goBack = () => {
        window.history.back(); 
    }

     //-----------------------------------------------녹화 기능----------------------------------//
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
  // -------------------------------------------------------------------------------- //



    return (    
        <div className={`container ${showTimer ? styles.transparentContainer : ''}`}>
            {/* {showTimer ? ( */}
            
            {/* 타이머 */}
            {showTimer && (
                // <div class="countdown">
            <div className={`${styles.overlay}`}>
                <div className={`${styles.centeredTimer} countdown`}>
                    <svg viewBox="-50 -50 100 100" stroke-width="10">
                        <circle r="45"></circle>
                        <circle r="45" pathLength="1"></circle>
                    </svg>
                </div>
            </div>
            )}

            
            {/* 발음 연습 화면 */}
             {/* ) : ( */}
                <div>

                    {/* 전체 컴포넌트 */}
                    {/* 제시어 & 화살표 */}
                    <div className={styles.back} onClick={goBack}>
                        <ArrowCircleLeftOutlinedIcon 
                        sx={{ fontSize: 40}}/><span>처음으로</span>
                    </div>

                    <div className={styles.questionSection}>
                        <div>
                            <ArrowBackIosNewIcon sx={{ fontSize: 40, color: blue[600] }} onClick={Prev}/>
                        </div>
                        <p className={styles.question}>제시어</p>
                        <div>
                            <ArrowForwardIosIcon sx={{ fontSize: 40, color: blue[600] }} onClick={Next}/>
                        </div>
                    </div>
                    
                    {/* 따라하기 박스 */}
                    <div className="container" style={{ display: 'flex', justifyContent:'center' }}>
                        <div className={`${styles.box} ${styles.box1}`}>
                            <div className={styles.oddboxinner}> 따라하기</div>
                            <video ref={guideVideoRef} style={{ height: '45vh', width: '40vw', transform: 'rotate(-2deg)' }} autoPlay controls>
                                no video available
                            </video>
                        </div>

                    {/* 내화면 박스 */}
                        <div className={`${styles.box} ${styles.box1}`}>

                        <div className="title">
                            <div className={styles.oddboxinner}> 내 화면</div>
                        </div>

                            {selectedCamera === 'no-camera' ? (
                                <img
                                    src={process.env.PUBLIC_URL + "/assets/pron/no-camera.jpg"}
                                    alt="No Camera"
                                    style={{ height: '45vh', transform: 'rotate(-2deg)'}}
                                />
                            ) : (
                            <div>
                                <div style={{height: '45vh', width: '40vw', transform: 'rotate(-2deg)'}}>
                                    <MyCamera myVideoRef={myVideoRef}/>
                                </div>
                            </div>
                            )}
                        </div>


                    </div>
                </div>
        



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
        
        <div style={{ display: 'flex', justifyContent: 'center', transform: 'rotate(-2deg)' }}>
            {/* 녹화 버튼 */}
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
        </div>


        </div>

    )
}

export default PronStart