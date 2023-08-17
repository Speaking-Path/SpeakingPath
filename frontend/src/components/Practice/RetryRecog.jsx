import styles from './RetryRecog.module.css'
import { blue } from '@mui/material/colors';
import ReplayIcon from '@mui/icons-material/Replay';
import { useRef } from 'react';





function RetryRecog({ handleWrongVisible }) {
  const outside = useRef()
  return (
    <div className={styles.RetryBox} ref={outside}
    onClick={(e) => { if (e.target == outside.current) handleWrongVisible() }}>
      <div className={styles.imgBox}>
        <img className={styles.medal} src={process.env.PUBLIC_URL + "/assets/reward/medal.png"} alt="" />
        <p>&nbsp;2점</p>
      </div>
      <p className={styles.celebrateText}>다시 골라보세요</p>
      <div className={styles.wordBox}>
        <img src={process.env.PUBLIC_URL + "/assets/retry.png"} alt="" />
        <ReplayIcon onClick={() => { handleWrongVisible() }}
          sx={{ color: blue[600], fontSize: 40 }} />
      </div>
    </div>
  )
}

export default RetryRecog