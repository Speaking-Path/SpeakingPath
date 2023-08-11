import styles from '../RetryRecog.module.css'
import ReplayIcon from '@mui/icons-material/Replay'
import { blue, yellow } from '@mui/material/colors'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { changeRecogNum } from '../../../store/recog'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'



function CelebrateRecog({ handleCorVisible, objId, objName, isSaved }) {
  const userId = useSelector((state) => { return state.loginId })
  const [isStarClicked, setIsStarClicked] = useState(isSaved)
  const num = useSelector((state) => { return state.recogNum })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getStar = function () {
    const data = {
      "objId": objId,
      "userId": userId
    }
    axios.post("practice/recog/object/save", data)
      .then((res) => {
        setIsStarClicked(!isStarClicked)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const plusNum = function () {
    dispatch(changeRecogNum(num + 1))
    handleCorVisible()
  }



  return (
    <div className={styles.celebrateBox}>
      <div className={styles.imgBox}>
        <img className={styles.medal} src={process.env.PUBLIC_URL + "/assets/reward/medal.png"} alt="" />
        <p>&nbsp;10점</p>
      </div>
      <p className={styles.celebrateText}>정답입니다!</p>
      <div className={styles.celebrateMain}>
        <p className={styles.objName}>{objName}</p>
        <img src={process.env.PUBLIC_URL + "/assets/PickPic/" + objId + ".jpg"} alt="" />
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
          <ReplayIcon onClick={() => { handleCorVisible() }}
            sx={{ color: blue[600], fontSize: 50 }} />
          {
            num === 9 ?
              <ExitToAppOutlinedIcon onClick={() => { navigate("/practice") }}
                sx={{ color: blue[600], fontSize: 50 }} />
              :
              <ArrowForwardIosIcon onClick={() => { plusNum() }}
                sx={{ color: blue[600], fontSize: 50 }} />
          }
        </div>
      </div>
    </div>
  )
}

export default CelebrateRecog