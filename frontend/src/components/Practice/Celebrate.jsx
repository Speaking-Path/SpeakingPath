import styles from './Celebrate.module.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



function Celebrate() {
  return (
    <div className={styles.celebrateBox}>
      <p>참 잘했어요!</p>
      <div>
        <p>단어</p>
        <p>발음</p>
        <div>
          <StarBorderIcon />
          <ReplayIcon />
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  )
}

export default Celebrate