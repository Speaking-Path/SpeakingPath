import styles from './ThirdPart.module.css'

const ThirdPart = () => {
  return (
    <div>
      <p className={styles.ThirdPartTitle}>언어재활 바로가기</p>
      <div className={styles.ThirdPartBox1}>
        <div className={styles.ThirdPartText}>
          <p className={styles.Text1}>혼자서도 쉬운 발음 연습</p>
          <p className={styles.Text2}>발음 연습을 통해 정확한 발음을 연습하세요</p>
          <p className={styles.Text3}>연습하러가기 &gt;</p>
        </div>
        <div>
          <img className={styles.ThirdPartImg} src={process.env.PUBLIC_URL + "/assets/main/secondPart1.png"} alt="" />
        </div>
      </div>
      <div className={styles.ThirdPartBox2}>
        <div className={styles.ThirdPartText}>
          <p className={styles.Text1}>인지능력 연습</p>
          <p className={styles.Text2}>집에서도 꾸준한 연습을 통해 인지 능력을 키워보세요.</p>
          <p className={styles.Text3}>연습하러가기 &gt;</p>
        </div>
        <div>
          <img className={styles.ThirdPartImg} src={process.env.PUBLIC_URL + "/assets/main/secondPart2.png"} alt="" />
        </div>
      </div>
    </div>
  )
}

export default ThirdPart