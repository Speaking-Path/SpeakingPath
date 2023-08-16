import styles from './SuccessPron.module.css'
import { blue, yellow } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReplayIcon from '@mui/icons-material/Replay';
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

function SuccessPron({ handleSuccess, currentData, Next, contentType, shortType }) {
  useEffect(() => {
    // console.log("videoSrc :", videoSrc);
  }, [])

  const videoSrc = currentData.src
  const currentContent = currentData.content

  const userId = useSelector((state) => { return state.loginId })
  const [isStarClicked, setIsStarClicked] = useState(currentData.saved)

  const getStar = function () {
    const data = {
      [shortType + "Id"]: currentData.id,
      "userId": userId
    }
    // console.log("data : ", data);
    axios.post("practice/pron/" + contentType + "/save", data)
      .then((res) => {
        setIsStarClicked(!isStarClicked)
        currentData.saved = !currentData.saved
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const plusNum = function () {
    Next()
    handleSuccess()
  }


  const outside = useRef()
  return (
    <div className={styles.RetryBox} ref={outside}
      onClick={(e) => { if (e.target === outside.current) handleSuccess() }}>

      <div className={styles.imgBox}>
        <img className={styles.medal} src={process.env.PUBLIC_URL + "/assets/reward/medal.png"} alt="" />
        <p>&nbsp;10점</p>
      </div>

      <p className={styles.celebrateText}>참 잘했어요!</p>

      <div className={styles.wordBox}>

        <div className={styles.topLine}>
          <div className={styles.content}>{currentContent}</div>
        </div>

        <video src={videoSrc} autoPlay controls>
          no video available
        </video>

        <div className={styles.icons}>
          {
            isStarClicked ? (
              <StarIcon onClick={() => { getStar() }}
                sx={{ color: yellow[600], fontSize: 50 }} />
            ) : (
              <StarOutlineIcon onClick={() => { getStar() }}
                sx={{ color: yellow[600], fontSize: 50 }} />
            )
          }
          <ReplayIcon onClick={() => { handleSuccess() }}
            sx={{ color: blue[600], fontSize: 50 }} />
          <ArrowForwardIosIcon onClick={() => { plusNum() }}
            sx={{ color: blue[600], fontSize: 50 }} />

        </div>
      </div>
    </div>
  )
}

export default SuccessPron