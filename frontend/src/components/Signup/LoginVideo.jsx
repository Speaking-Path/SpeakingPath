import styles from './LoginVideo.module.css'

function LoginVideo() {
  return (
    <div className={styles.videoBox}>
      <video muted autoPlay loop>
      <source src={process.env.PUBLIC_URL + "/assets/loginvideo/loginVideo.mp4"} type="video/mp4"/>
      </video>
    </div>
  )
}

export default LoginVideo