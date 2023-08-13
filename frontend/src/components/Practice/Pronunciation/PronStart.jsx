import MyCamera from "../../profile/MyCamera"
import { useRef, useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { selectMediaConfig } from '../../../store/mediaConfig.js';
import styles from "./PronStart.module.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { blue } from "@mui/material/colors";

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

    useEffect(() => {
        getPronData()
        guideVideoRef.current.src=pronData.current.at(currentIndex).src
        if (selectedCamera !== 'no-camera') {
            myVideoRef.current.style = "height: 45vh;"
        }
    }, [])

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

    return (
        <div>
            
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
        
            <div className="container" style={{ display: 'flex', justifyContent:'center' }}>
                    
                <div className={`${styles.box} ${styles.box1}`}>
                    <div className={styles.oddboxinner}> 따라하기</div>
                    <video ref={guideVideoRef} style={{ height: '45vh', width: '40vw', transform: 'rotate(-2deg)' }} autoPlay controls>
                        no video available
                    </video>
                </div>

                <div className={`${styles.box} ${styles.box1}`}>
                    <div className={styles.oddboxinner}> 내 모습</div>
                    {selectedCamera === 'no-camera' ? (
                        <img
                            src={process.env.PUBLIC_URL + "/assets/pron/no-camera.jpg"}
                            alt="No Camera"
                            style={{ height: '45vh', transform: 'rotate(-2deg)'}}
                            />
                        ) : (
                            <div style={{height: '45vh', width: '40vw', transform: 'rotate(-2deg)'}}>
                                <MyCamera myVideoRef={myVideoRef}/>
                            </div>
                        )}
                </div>

                {/* <div>
                    <MyCamera myVideoRef={myVideoRef} />
                </div> */}
            </div>

            {/* <div className={`${styles.box} ${styles.box1}`}>
                <div className={styles.oddboxinner}> 가이드</div>
            </div> */}
 
        </div>
    )
}

export default PronStart