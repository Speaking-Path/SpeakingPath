import styles from './CelebratePron.module.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { blue } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { changeWrong } from '../../store/pron';



function RetryPron() {
  const dispatch = useDispatch()

  return (
    <div className={styles.celebrateBox}>
      <p className={styles.celebrateText}>다시 도전해봐요!</p>
      <div className={styles.wordBox}>
        <p className={styles.word}>자동차</p>
        <p className={styles.pron}>[자동-차]</p>
        <div className={styles.icons}>
          <StarBorderIcon sx={{ fontSize: 50, color: blue[600] }} />
          <ReplayIcon onClick={()=>{dispatch(changeWrong(false))}}
          sx={{ fontSize: 50, color: blue[600] }} />
          <ArrowForwardIosIcon onClick={()=>{dispatch(changeWrong(false))}}
          sx={{ fontSize: 50, color: blue[600] }} />
        </div>
      </div>
    </div>
  )
}

export default RetryPron