import styles from "./FourthPart.module.css"

const FourthPart = () => {
  return (
    <div className={styles.forthPart}>
      <p>이용안내</p>
      <div className={styles.FourthPartBox}>
        <div className={styles.box}>
          <p className={styles.title}>단어말하기</p>
          <img className={styles.fourthPartImg} src={process.env.PUBLIC_URL + "/assets/main/FourthPart1.png"} alt="" />
          <div className={styles.boxInfo}>
            <p>제시된 단어를 보고 따라하는</p>
            <p>연습을 통해 인지력을 향상</p>
          </div>
        </div>
        <div className={styles.box}>
          <p className={styles.title}>문장말하기</p>
          <img className={styles.fourthPartImg} src={process.env.PUBLIC_URL + "/assets/main/FourthPart2.png"} alt="" />
          <div className={styles.boxInfo}>
            <p>제시된 단어를 보고 따라하는</p>
            <p>연습을 통해 인지력을 향상</p>
          </div>
        </div>
        <div className={styles.box}>
          <p className={styles.title}>사물고르기</p>
          <img className={styles.fourthPartImg} src={process.env.PUBLIC_URL + "/assets/main/FourthPart3.png"} alt="" />
          <div className={styles.boxInfo}>
            <p>제시된 단어를 보고 따라하는</p>
            <p>연습을 통해 인지력을 향상</p>
          </div>
        </div>
        <div className={styles.box}>
          <p className={styles.title}>사물이름맞히기</p>
          <img className={styles.fourthPartImg} src={process.env.PUBLIC_URL + "/assets/main/FourthPart4.png"} alt="" />
          <div className={styles.boxInfo}>
            <p>제시된 단어를 보고 따라하는</p>
            <p>연습을 통해 인지력을 향상</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FourthPart