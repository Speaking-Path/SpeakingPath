import styles from '../RetryRecog.module.css'
import ReplayIcon from '@mui/icons-material/Replay'
import { blue, yellow } from '@mui/material/colors'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'



function CelebrateRecog({ handleCorVisible, objId, objName, savedList }) {
  const userId = useSelector((state)=>{return state.loginId})
  const [isStarClicked, setIsStarClicked] = useState(savedList)

  const getStar = function() {
    const data = {
      "objId" : objId,
      "userId" : userId
    }
    axios.post("practice/pron/object/save", data)
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }





  return (
    <div className={styles.celebrateBox}>
      <p className={styles.celebrateText}>{objName}</p>
      <div className={styles.celebrateMain}>
        <img src={process.env.PUBLIC_URL + "/assets/PickPic/" + objId + ".jpg"} alt="" />
        <div>
          {
            isStarClicked ? (
              <StarIcon onClick={()=>{getStar()}}
              sx={{ color: yellow[600], fontSize: 40 }} />
            ) : (
              <StarOutlineIcon onClick={()=>{getStar()}}
              sx={{ color: yellow[600], fontSize: 40 }} />
            )
          }
          <ReplayIcon onClick={() => { handleCorVisible() }}
            sx={{ color: blue[600], fontSize: 40 }} />
          <ArrowForwardIosIcon 
          sx={{ color: blue[600], fontSize: 40 }} />
        </div>
      </div>
    </div>
  )
}

export default CelebrateRecog