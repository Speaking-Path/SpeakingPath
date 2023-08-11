import styles from "./FourthPart.module.css"
import 'aos/dist/aos.css';
import Aos from 'aos';
import { useEffect } from 'react';

const FourthPart = () => {
  useEffect(()=>{
    Aos.init({duration: 1000})
  })

  return (
    <div className={styles.forthPart}>
      <p>이용안내</p>
      <div className={styles.FourthPartBox}>
        <div className={styles.box} data-aos="fade-up" data-aos-delay="0">
          <p className={styles.title}>단어말하기</p>
          <img className={styles.fourthPartImg} src={process.env.PUBLIC_URL + "/assets/main/FourthPart1.png"} alt="" />
          <div className={styles.boxInfo}>
            <p>주어진 단어를 반복해서 읽으며</p>
            <p>발음에 대한 적응력 향상</p>
          </div>
        </div>
        <div className={styles.box} data-aos="fade-up" data-aos-delay="200">
          <p className={styles.title}>문장말하기</p>
          <img className={styles.fourthPartImg} src={process.env.PUBLIC_URL + "/assets/main/FourthPart2.png"} alt="" />
          <div className={styles.boxInfo}>
            <p>문장을 보고 읽는 모습을</p>
            <p>화면으로 확인하며 발음 연습</p>
          </div>
        </div>
        <div className={styles.box} data-aos="fade-up" data-aos-delay="400">
          <p className={styles.title}>사물고르기</p>
          <img className={styles.fourthPartImg} src={process.env.PUBLIC_URL + "/assets/main/FourthPart3.png"} alt="" />
          <div className={styles.boxInfo}>
            <p>제시된 단어에 맞는 사진을 고르는</p>
            <p>연습으로 인지능력 향상</p>
          </div>
        </div>
        <div className={styles.box} data-aos="fade-up" data-aos-delay="600">
          <p className={styles.title}>사물이름맞히기</p>
          <img className={styles.fourthPartImg} src={process.env.PUBLIC_URL + "/assets/main/FourthPart4.png"} alt="" />
          <div className={styles.boxInfo}>
            <p>사진에 맞는 단어를 읽으며</p>
            <p>녹음한 목소리를 분석</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FourthPart