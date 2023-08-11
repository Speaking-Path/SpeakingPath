import React, { useEffect } from 'react';
import styles from './Banner2.module.css'
import 'aos/dist/aos.css';
import Aos from 'aos';


const Banner = () => {
  useEffect(()=>{
    Aos.init({duration: 500})
  })
  return (
    <section className={styles.banner}>

      {/*웹사이트 소개글*/}
      <div className={styles.banner_text_all}>
        <p className={styles.banner_text1}>
          <span className={styles.banner_text1_blue} data-aos="fade-up">말하길</span>은 언어 장애로 인해 <br/>
          어려움을 겪는 환자들을 위한 온라인 플랫폼입니다.<br/>
        </p>

        <p className={styles.banner_text2} data-aos="fade-up">
          뇌졸중으로 인한 언어 장애는 많은 환자들이 경험하고 있습니다.<br/>
          온라인 플랫폼을 활용하여 치료를 제공함으로써, <br/>
          환자들의 치료에 대한 접근성과 편의성을 크게 향상시킬 수 있습니다.
        </p>
      </div>

      {/*그래픽이미지*/}
      <img data-aos="fade-up"
        className={`d-block w-100 ${styles.banner_img1}`}
        src={process.env.PUBLIC_URL + "/assets/main/main_img_1.png"}
        alt="main_img_1 error"
      />

    </section>
  );
};

export default Banner;
