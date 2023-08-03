import styles from './RetryRecog.module.css'
import { blue } from '@mui/material/colors';
import ReplayIcon from '@mui/icons-material/Replay';



function RetryRecog() {
  return (
    <div className={styles.celebrateBox}>
      <p className={styles.celebrateText}>다시 골라보세요</p>
      <div className={styles.wordBox}>
        <img src={process.env.PUBLIC_URL + "/assets/retry.png"} alt="" />
        <ReplayIcon sx={{ color: blue[600], fontSize: 40 }}/>
      </div>
    </div>
  )
}

export default RetryRecog