import { blue } from '@mui/material/colors';
import styles from './VideoComp.module.css'
import CloseIcon from '@mui/icons-material/Close';

function VideoComp({ videoSrc, setIsVideo }) {

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.closeIcon}>
          <CloseIcon onClick={() => { setIsVideo(false) }} sx={{ fontSize: 50, color: blue[600] }}/>
        </div>
        <video controls className={styles.video}>
          <source src={process.env.PUBLIC_URL + "/assets/" + videoSrc + ".mp4"} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default VideoComp