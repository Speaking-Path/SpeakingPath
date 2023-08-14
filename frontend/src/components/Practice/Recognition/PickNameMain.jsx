import Confetti from "../Confetti";
import RetryRecog from "../RetryRecog";
import { useState } from "react";
// import styles from './PickPicMain.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from './PickNameMain.module.css'
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
import CelebrateRecogName from "./CelebrateRecogName";
import VoiceRecording from './VoiceRecording';
import axios from "axios";
// import correctAnswer from '../CheckAnswer'
// import wrongAnswer from '../CheckAnswer'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';



function PickNameMain({ qlist, goForward, goBack, retry }) {
  const userId = useSelector((state) => state.loginId);
  const [isCorVisible, setIsCorVisible] = useState(false);
  const [isWrongVisible, setIsWrongVisible] = useState(false);
  const num = useSelector((state) => { return state.recogNameNum })

  const answer = qlist.answerList || {};
  const questions = qlist.questionList || [];

  const correctAnswer = function () {
    axios
      .post("/practice/correct", { userId: userId })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const wrongAnswer = function () {
    axios
      .post("/practice/wrong", { userId: userId })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [voiceAnswer, setVoiceAnswer] = useState(null)


  const checkAns = function () {
    if (voiceAnswer !== null && voiceAnswer === "success") {
      setIsCorVisible(true);
      // correctAnswer()
    } else if (voiceAnswer !== null && voiceAnswer === "fail") {
      setIsWrongVisible(true);
      // wrongAnswer()
    }
  };


  const handleCorVisible = function () {
    setIsCorVisible(false)
  }

  const handleWrongVisible = function () {
    setIsWrongVisible(false)
  }


  return (
    <div className={styles.picMainBox}>
      <div className={styles.back} onClick={() => { retry() }}>
        <ArrowCircleLeftOutlinedIcon
          sx={{ fontSize: 40 }} /><span>처음으로</span>
      </div>
      {answer.objName && <p className={styles.question}>Q. 사진과 어울리는 보기를 말해보세요.</p>}
      <div className={styles.arrowBox}>
        <ArrowBackIosNewIcon className={num === 0 ? styles.hiddenComponent : null}
          sx={{ color: blue[700], fontSize: 40 }} onClick={() => { goBack() }} />
        {answer.objId && <img src={process.env.PUBLIC_URL + "/assets/PickPic/" + answer.objId + ".jpg"}
          className={styles.imgBox} alt="" />}
        <ArrowForwardIosIcon className={num === 9 ? styles.hiddenComponent : null}
          sx={{ color: blue[700], fontSize: 40 }} onClick={() => { goForward() }} />
      </div>
      <div>
        <VoiceRecording answer={answer} setVoiceAnswer={setVoiceAnswer}/>
      </div>
      <div className={`${styles.mapBox} container`}>
        <div className="row">
          {
            questions.map((question, index) => (
              <div onClick={() => { checkAns(question.objId) }} className={`${styles.map} col-6`} key={index}>
                <p className={styles.index}>{index + 1}</p>
                <p className={styles.mapP} >
                  {question.objName}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div>
        {isCorVisible && <Confetti />}
        {isCorVisible && <CelebrateRecogName
          handleCorVisible={handleCorVisible} objId={answer.objId}
          objName={answer.objName} savedList={qlist.savedList} />}
        {isWrongVisible && <RetryRecog handleWrongVisible={handleWrongVisible} />}
      </div>
    </div>
  );
}

export default PickNameMain;
