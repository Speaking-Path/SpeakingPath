import Confetti from "../Confetti";
import RetryRecog from "../RetryRecog";
import { useState } from "react";
import styles from './PickPicMain.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CelebrateRecog from "./CelebrateRecog";

function PickPicMain({ qlist, num, goForward, goBack }) {
  const [isCorVisible, setIsCorVisible] = useState(false);
  const [isWrongVisible, setIsWrongVisible] = useState(false);

  const answer = qlist.answerList || {};
  const questions = qlist.questionList || [];

  const checkAns = function (objId) {
    if (objId === answer.objId) {
      setIsCorVisible(true);
    } else {
      setIsWrongVisible(true);
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
      {answer.objName && <p>Q. 사진과 어울리는 단어를 골라주세요.</p>}
      <div>
        {
          num !== 0 && <ArrowBackIosNewIcon onClick={()=>{goBack()}}/>
        }
        {answer.objId && <img src={process.env.PUBLIC_URL + "/assets/PickPic/" + answer.objId + ".jpg"}
          className={styles.imgBox} alt="" />}
        {
          num !== 9 && <ArrowForwardIosIcon onClick={()=>{goForward()}}/>
        }
      </div>
      <div>
        {
          questions.map((question, index) => (
            <div key={index}>
              <p onClick={() => { checkAns(question.objId) }}>{question.objName}</p>
            </div>
          ))
        }
      </div>
      <div>
        {isCorVisible && <Confetti />}
        {isCorVisible && <CelebrateRecog
          handleCorVisible={handleCorVisible} objId={answer.objId}
          objName={answer.objName} savedList={qlist.savedList}/>}
        {isWrongVisible && <RetryRecog handleWrongVisible={handleWrongVisible} />}
      </div>
    </div>
  );
}

export default PickPicMain;
