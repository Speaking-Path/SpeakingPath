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
import './PronButton.scss'
import RecorderJS from 'recorder-js'
import { exportBuffer } from '../Recognition/audio' 
import axios from 'axios'
import { useNavigate } from "react-router-dom";


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
    const mediaRecorderRef = useRef(null);
    const recordedBlobsRef = useRef([]);
    const [guideVideoEnded, setGuideVideoEnded] = useState(false); // 가이드 비디오 재생이 끝났는지 여부 상태 추가
    const [showTimer, setShowTimer] = useState(true);

    const audioRecorderRef = useRef(null)
    const audioBlobRef = useRef(null)

    const contentRef = useRef(null)

    const navigate = useNavigate();

    // 원래 코드
    // useEffect(() => {
    //     getPronData()
    //     guideVideoRef.current.src=pronData.current.at(currentIndex).src
    //     if (selectedCamera !== 'no-camera') {
    //         myVideoRef.current.style = "height: 45vh;"
    //     }
    // }, [])


    useEffect(() => {
        window.scrollTo({ top: 70, behavior: 'smooth' });
        getPronData();
        // const newIndex = (currentIndex + 1) % pronData.current.length;
        // setCurrentIndex(newIndex);
        if (guideVideoRef.current) {
            guideVideoRef.current.onended = handleGuideVideoEnded;
        }
        if (selectedCamera !== 'no-camera') {
            myVideoRef.current.style = "height: 45vh;";
        }
    }, []); // 컴포넌트 마운트 시에만 실행


    useEffect(() => {
        if (!showTimer && !guideVideoEnded) {
            if (guideVideoRef.current) {
                // guideVideoRef.current.src = pronData.current[newIndex].src;
                guideVideoRef.current.src = pronData.current.at(currentIndex).src
            }
            // guideVideoRef.current.style = "height: 45vh; width: 40vw; transform: rotate(-2deg);";
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

    useEffect(() => {
        getPronData();
        if (guideVideoEnded) {
            // 가이드 비디오 재생이 끝나면 5초 뒤에 녹화 시작 함수 호출
            if (myVideoRef.current) {
                const timer = setTimeout(() => {
                    startRecording();
                    setRecording(true);
                }, 5000);

                return () => {
                    clearTimeout(timer);
                };
            }
        }
    }, [guideVideoEnded, currentIndex]);


    useEffect(() => {
        if (recording) {
            stopRecording(); // 녹화 중이면 녹화 중지
            setRecording(false);
        }
        setGuideVideoEnded(false);
        contentRef.current.innerText=pronData.current[currentIndex] && pronData.current[currentIndex].content
    }, [currentIndex])



    function handleGuideVideoEnded() {
        if (myVideoRef.current) {
            setGuideVideoEnded(true); // 가이드 비디오 재생이 끝났음을 표시
            setShowTimer(true);
        }
    }

    // 데이터 받는 함수. 지금은 임시로 assets에 있는 동영상을 활용하고 나중에 BE api가 완성되면 대체
    async function getPronData() {
        pronData.current = []
        let path=""
        let apiurl=""
        let shortType=""
        // let path = process.env.PUBLIC_URL + "/assets/sentence/"
        // let nfile = 5
        // 1) 음절일때
        if (props.type === "syllable") {
            path = process.env.PUBLIC_URL + "/assets/syllable/"
            apiurl = "/practice/pron/syllable"
            shortType = "slb"
        // 2) 단어일때
        } else if (props.type === "word") {
            path = process.env.PUBLIC_URL + "/assets/word/"
            apiurl = "/practice/pron/word"
        // 3) 문장일때
        } else if (props.type === "sentence") {
            path = process.env.PUBLIC_URL + "/assets/sentence/"
            apiurl = "/practice/pron/sentence"
            shortType = "stc"
        }
        await axios.get(apiurl)
            .then((res) => {
                pronData.current=res.data.map((e)=>{
                    e["id"]=e[shortType+"Id"]
                    e["content"]=e[shortType+"Content"]
                    e["src"]=process.env.PUBLIC_URL + path + (e["id"]).toString() + ".mp4"
                    return e
                })
                console.log(pronData.current)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    // 다음 문제로
    function Next() {
        const newIndex = (currentIndex + 1) % pronData.current.length
        guideVideoRef.current.src = pronData.current.at(newIndex).src
        setCurrentIndex(newIndex)
        console.log("Next",pronData.current,currentIndex)
    }

    // 이전 문제로
    function Prev() {
        const newIndex = (currentIndex - 1) % pronData.current.length
        guideVideoRef.current.src = pronData.current.at(newIndex).src
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
        recordedBlobsRef.current = [];
        const mimeType = getSupportedMimeTypes()[0].value;
        const options = { mimeType };

        try {
            mediaRecorderRef.current = new MediaRecorder(myVideoRef.current.srcObject, options);
            // 음성 recorder 추가
            const recording_stream = new MediaStream(); // stream을 recoder에 넣어줘야 함. 빈 stream을 일단 만들어줌
            for (const track of myVideoRef.current.srcObject.getAudioTracks()) {
                recording_stream.addTrack(track)
            }
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const newRecorder = new RecorderJS(audioContext);
            newRecorder.init(recording_stream);
            audioRecorderRef.current = newRecorder;
        } catch (e) {
            console.error('Exception while creating MediaRecorder:', e);
            return;
        }

        console.log('Created MediaRecorder', mediaRecorderRef.current, 'with options', options);
        mediaRecorderRef.current.onstop = (event) => {
            console.log('Recorder stopped: ', event);
            console.log('Recorded Blobs: ', recordedBlobsRef.current);
        };
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();
        audioRecorderRef.current.start();
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
        // 녹화중이 아닌 상태에서 버튼을 누렀을 때 
        if (recording === false) {
            const selectedVideo = mediaConfig.camera; // Redux 상태에서 선택된 카메라 정보 가져오기

            if (selectedVideo === null || selectedVideo === 'no-camera') {
                alert("녹화할 카메라 장치를 선택해주세요 📸");
                return;
            }

            startRecording();
            setRecording(true);
            toggleButtonClass(recordButtonRef.current);

            // 녹화중인 상태에서 버튼을 눌렀을 때
        } else {
            stopRecording();
            setRecording(false);
            toggleButtonClass(recordButtonRef.current);
            setTimeout(() => {
                handlePlayButtonClick();
            }, 2000);
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

    // function stopRecording() {
    async function stopRecording() {
        mediaRecorderRef.current.stop();
        const { buffer } = await audioRecorderRef.current.stop();
        const audio = exportBuffer(buffer[0]);
        audioBlobRef.current = audio

        setRecording(false)
    }

    function handlePlayButtonClick() {
        console.log("play button clicked")
        const mimeType = getSupportedMimeTypes()[0].value;
        const superBuffer = new Blob(recordedBlobsRef.current, { type: mimeType });
        const mystream = myVideoRef.current.srcObject;
        myVideoRef.current.src = null;
        myVideoRef.current.srcObject = null;
        myVideoRef.current.src = window.URL.createObjectURL(superBuffer);
        console.log("recorded video start")
        myVideoRef.current.play();
        myVideoRef.current.muted = false; // 녹화파일 재생시엔 소리 ON
        myVideoRef.current.onended = (event) => {
            sendAudioToServer()
            console.log("recorded video end")
            if (myVideoRef.current) {
                myVideoRef.current.src = null;
                myVideoRef.current.srcObject = mystream;
                myVideoRef.current.muted = true; // 에코 방지
            }
        }
    }


    const sendAudioToServer = async () => {
        // const sttServer = axios.create({ baseURL: "http://localhost:5001" })
        try {
          // Convert Blob to Base64 string
          const reader = new FileReader();
          reader.readAsDataURL(audioBlobRef.current);
    
          reader.onload = async () => {
            const base64Audio = reader.result.split(',')[1]; // Extract base64 data
    
            // Send Base64 audio to the server
            const sttServer = axios.create({ baseURL: "https://i9c109.p.ssafy.io:5001" });
            await sttServer.post('/stt/result', {
              file: base64Audio,
            //   answer: answer.objName,
                answer : '동전'
              // format: 'pcm'
            }).then(response => {
              console.log(response.data.result) // 여기에 음성인식 결과가 출력됩니다!!
              console.log(response.data.predict)
              console.log(response.data.accuracy)
            });
          };
        } catch {
          navigate('/error', { message: "잘못된 접근입니다." }); // 에러 발생 시 ErrorPage로 리다이렉트
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
                    <div className={styles.guideText}>
                        {guideVideoEnded ? '이제 따라해보세요!' : '발음을 잘 들어보세요'}
                    </div>
                </div>
            )}


            <div>
                {/* 전체 컴포넌트 */}
                {/* 제시어 & 화살표 */}
                <div className={styles.back} onClick={goBack}>
                    <ArrowCircleLeftOutlinedIcon
                        sx={{ fontSize: 40 }} /><span>처음으로</span>
                </div>

                <div className={styles.questionSection}>
                    <div>
                        <ArrowBackIosNewIcon sx={{ fontSize: 40, color: blue[600] }} onClick={Prev} />
                    </div>
                    {/* 제시어 */}
                    <p ref={contentRef} className={styles.question}></p>
                    <div>
                        <ArrowForwardIosIcon sx={{ fontSize: 40, color: blue[600] }} onClick={Next} />
                    </div>
                </div>

                <div className={`${styles.videoSection}`}>
                    {/* 따라하기 박스 */}
                    <div className={`${styles.videoBox}`}>
                        {/* <div className='container'> */}
                        <div className={`${styles.guide}`}>
                            <div className={styles.title}> 따라하기</div>
                            <video ref={guideVideoRef} style={{ height: '45vh', width: '40vw' }} autoPlay controls>
                                no video available
                            </video>
                            {/* {showTimer ? (
                                <div className={styles.followText}>이제 따라해보세요</div>
                            ) : null} */}
                        </div>
                    </div>

                    {/* 내화면 박스 */}
                    <div className={`${styles.videoBox}`}>

                        {/* <div className='container'> */}
                        <div className={`${styles.guide}`}>
                            <div className={styles.title}> 내 모습</div>
                            {/* 녹화 버튼 */}
                            <button
                                id="record"
                                className={`start-pause-button2 ${recording ? 'playing' : ''} ${recording === false ? 'paused' : ''}`}
                                onClick={handleRecordButtonClick}
                                ref={recordButtonRef}
                            >

                                {recording ? (
                                    <>
                                        <i>마치기</i>
                                        <i>.</i>
                                    </>
                                ) : (
                                    <>
                                        <i>시작</i>
                                        <i>.</i>
                                    </>
                                )}
                            </button>
                            {/* </div> */}

                            {selectedCamera === 'no-camera' ? (
                                <img
                                    src={process.env.PUBLIC_URL + "/assets/pron/no-camera.jpg"}
                                    alt="No Camera"
                                    style={{ height: '45vh' }}
                                />
                            ) : (
                                <div>
                                    <div style={{ height: '45vh', width: '40vw' }}>
                                        <MyCamera myVideoRef={myVideoRef} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>

        // </div>

    )
}

export default PronStart