// {isWrongVisible && <RetryRecog handleWrongVisible={handleWrongVisible} />}


import styles from './RetryPron.module.css'
import { blue } from '@mui/material/colors';
import ReplayIcon from '@mui/icons-material/Replay';
import { useEffect, useRef } from 'react';


function RetryPron({ handleFail, videoSrc, currentContent }) {
    useEffect(()=>{
        console.log("videoSrc :", videoSrc );
    }, [])

  const outside = useRef()
  return (
    <div className={styles.RetryBox} ref={outside}
    onClick={(e) => { if (e.target === outside.current) handleFail() }}>
      <div className={styles.imgBox}>
        <img className={styles.medal} src={process.env.PUBLIC_URL + "/assets/reward/medal.png"} alt="" />
        <p>&nbsp;2점</p>
      </div>
      <p className={styles.celebrateText}>다시 도전해보세요</p>
      <div className={styles.wordBox}>
        <div className={styles.topLine}>
            <ReplayIcon onClick={() => { handleFail() }}
            sx={{ color: blue[600], fontSize: 40 }} />
            <div className={styles.content}>{currentContent}</div>
        </div>
        <video src={videoSrc} autoPlay controls>
            no video available
        </video>
      </div>
    </div>
  )
}

export default RetryPron