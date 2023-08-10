import MyCamera from "../../profile/MyCamera"
import { useRef, useEffect, useState } from "react"

function PronStart(props) {
    // 전문가 영상 ref
    const guideVideoRef = useRef(null)
    // MyCamera에 전달될 ref
    const myVideoRef = useRef(null);
    // 문제들을 저장할 배열
    const pronData = useRef([])
    // 현재 문제 인덱스
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        getPronData()
        guideVideoRef.current.src=pronData.current.at(currentIndex).src
        myVideoRef.current.style="height: 40vh; width: 40vw"
    }, [])

    // 데이터 받는 함수. 지금은 임시로 assets에 있는 동영상을 활용하고 나중에 BE api가 완성되면 대체
    function getPronData() {
        pronData.current = []
        let path=process.env.PUBLIC_URL + "/assets/sentence/"
        if(props.type==="syllable"){
            path=process.env.PUBLIC_URL + "/assets/syllable/"
        }else if(props.type==="word"){
            path=process.env.PUBLIC_URL + "/assets/word/"
        }else if(props.type==="sentence"){
            path=process.env.PUBLIC_URL + "/assets/sentence/"
        }
        for (let i = 0; i < 5; i++) {
            const data = {
                src: process.env.PUBLIC_URL + path + (i+1).toString()+".mp4",
            }
            pronData.current.push(data)
        }
        console.log(pronData.current)
    }

    // 다음 문제로
    function Next(){
        guideVideoRef.current.src=pronData.current.at(currentIndex+1).src
        setCurrentIndex(currentIndex+1)
    }

    // 이전 문제로
    function Prev(){
        guideVideoRef.current.src=pronData.current.at(currentIndex-1).src
        setCurrentIndex(currentIndex-1)
    }

    return (
        <div>
            <h1>PronStart</h1>
            <div className="container" style={{ display: 'flex', justifyContent:'center' }}>
                {/* <video ref={guideVideoRef} style={{ height: '50vh', width: '50vw'}} autoPlay loop controls> */}
                <video ref={guideVideoRef} style={{ height: '40vh', width: '40vw'}} autoPlay loop controls>
                    no video available
                </video>
                <div>
                    <MyCamera myVideoRef={myVideoRef} />
                </div>
            </div>
                <button onClick={Prev}>Prev</button>
                <button onClick={Next}>Next</button>
        </div >
    )
}

export default PronStart

