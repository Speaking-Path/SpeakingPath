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
      {answer.objName && <p>{answer.objName}를 골라주세요</p>}
      <div className={styles.pickBox}>
        <div>
        {
          num !== 0 && <ArrowBackIosNewIcon onClick={() => { goBack() }} />
        }
        </div>
        <div className="container">
          <div className="row">
            {
              questions.map((question, index) => (
                <div className="col-6" key={index}>
                  <img className={styles.img} onClick={() => { checkAns(question.objId) }}
                    src={process.env.PUBLIC_URL + "/assets/PickPic/" + question.objId + ".jpg"} alt="" />
                </div>
              ))
            }
          </div>
        </div>
        <div>
        {
          num !== 9 && <ArrowForwardIosIcon onClick={() => { goForward() }} />
        }
        </div>
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
