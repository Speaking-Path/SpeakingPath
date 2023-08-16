import styles from './SuccessPron.module.css'
import { blue, yellow } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReplayIcon from '@mui/icons-material/Replay';
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';


function SuccessPron({ handleSuccess, videoSrc, currentContent, Next }) {
    useEffect(()=>{
        console.log("videoSrc :", videoSrc );
    }, [])

    // const userId = useSelector((state) => { return state.loginId })
    // const [isStarClicked, setIsStarClicked] = useState(isSaved)
    // const num = useSelector((state) => { return state.recogNum })
  
    // const dispatch = useDispatch()
    const navigate = useNavigate()
  
    // const getStar = function () {
    //   const data = {
    //     "objId": objId,
    //     "userId": userId
    //   }
    //   axios.post("practice/recog/object/save", data)
    //     .then((res) => {
    //       setIsStarClicked(!isStarClicked)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }
  
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
        {/* <div className={styles.icons}>
          <StarBorderIcon sx={{ fontSize: 50, color: blue[600] }} />
          <ReplayIcon onClick={()=>{ handleSuccess() }} 
          sx={{ fontSize: 50, color: blue[600] }} />
          <ArrowForwardIosIcon onClick={()=> { handleSuccess() }}
          sx={{ fontSize: 50, color: blue[600] }} />
        </div> */}
        <div className={styles.icons}>
            <StarIcon sx={{ color: yellow[600], fontSize: 50 }} />
            <ReplayIcon onClick={() => { handleSuccess() }}
                sx={{ color: blue[600], fontSize: 50 }} />
            <ArrowForwardIosIcon onClick={() => { plusNum() }}
                sx={{ color: blue[600], fontSize: 50 }} />
            {/* <ExitToAppOutlinedIcon onClick={() => { navigate("/practice") }}
                sx={{ color: blue[600], fontSize: 50 }} /> */}

          {/* {
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
          {
            num === 9 ?
              <ExitToAppOutlinedIcon onClick={() => { navigate("/practice") }}
                sx={{ color: blue[600], fontSize: 50 }} />
              :
              <ArrowForwardIosIcon onClick={() => { plusNum() }}
                sx={{ color: blue[600], fontSize: 50 }} />
          } */}
        </div>
      </div>
    </div>
  )
}

export default SuccessPron