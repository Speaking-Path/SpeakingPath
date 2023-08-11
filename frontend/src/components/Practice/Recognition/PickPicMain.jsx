import Confetti from "../Confetti";
import RetryRecog from "../RetryRecog";
import { useState } from "react";
import styles from './PickPicMain.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CelebrateRecog from "./CelebrateRecog";
import axios from "axios";
import { useSelector } from "react-redux";
import { blue } from "@mui/material/colors";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';


function PickPicMain({ qlist, goForward, goBack, retry }) {
  const [isCorVisible, setIsCorVisible] = useState(false);
  const [isWrongVisible, setIsWrongVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(undefined)
  const userId = useSelector((state) => { return state.loginId })
  const num = useSelector((state) => { return state.recogNum })


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

  const checkAns = function (objId) {
    if (objId === answer.objId) {
      setIsCorVisible(true);
      axios.post("practice/recog/object/issaved",
         {
            "userId": userId,
            "objId": objId
          })
        .then((res) => {
          setIsSaved(res.data)
          correctAnswer()
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setIsWrongVisible(true);
      wrongAnswer()
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
      <div className={styles.back} onClick={()=>{retry()}}>
        <ArrowCircleLeftOutlinedIcon 
        sx={{ fontSize: 40}}/><span>처음으로</span>
      </div>
      {answer.objName &&
        <div className={styles.picMainTitle}>
          <div>
            <ArrowBackIosNewIcon className={num === 0 ? styles.hiddenComponent : null} sx={{ fontSize: 40, color: blue[600] }} onClick={() => { goBack(); setIsSaved(undefined); }} />
          </div>
          <p className={styles.objName}>다음 중 <span>{answer.objName}</span>은(는) 무엇일까요?</p>
          <div>
            <ArrowForwardIosIcon className={num === 9 ? styles.hiddenComponent : null}
              sx={{ fontSize: 40, color: blue[600] }} onClick={() => { goForward(); setIsSaved(undefined); }} />
          </div>
        </div>
      }
      <div className={styles.pickBox}>
        <div className="container">
          <div className="row">
            {
              questions.map((question, index) => (
                <div className={`${styles.question} col-6`} key={index}>
                  <div className={styles.imageContainer}>
                  <p>{index+1}</p>
                  <img className={styles.img} onClick={() => { setIsSaved(undefined); checkAns(question.objId) }}
                    src={process.env.PUBLIC_URL + "/assets/PickPic/" + question.objId + ".jpg"} alt="" />
                </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div>
        {isCorVisible && isSaved !== undefined && <Confetti />}
        {isCorVisible && isSaved !== undefined && <CelebrateRecog
          handleCorVisible={handleCorVisible} objId={answer.objId}
          objName={answer.objName} isSaved={isSaved} />}
        {isWrongVisible && <RetryRecog handleWrongVisible={handleWrongVisible} />}
      </div>
    </div>
  );
}

export default PickPicMain;
