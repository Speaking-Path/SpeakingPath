import React, { useEffect, useRef } from 'react';
import styles from './SecondPart.css'

const SecondPart = () => {


  return (
    <div className={styles.outerWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.slide}>
          <img src={process.env.PUBLIC_URL + "/assets/main/main_bnr_1.jpg"} alt="" />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.slide}>
          <img src={process.env.PUBLIC_URL + "/assets/main/main_bnr_2.jpg"} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SecondPart;
