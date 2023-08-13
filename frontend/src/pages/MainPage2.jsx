import React from 'react';
import styles from './MainPage2.module.css'
import { useNavigate } from 'react-router-dom';

const MainPage2 = () => {
  const navigate = useNavigate()

  const cards = [
    {
      title: '언어재활',
      text: '말하길이 제공하는 언어재활 프로그램을\n체험해 보세요.',
      url : '/practice'
    },
    {
      title: '치료상담',
      text: "치료사와의 비대면 상담을 신청, 진행할 수 있습니다.",
      url : '/consulting'
    }
  ];

  return (
    <div className={styles.box}>
      <div className={styles.titleBox}>
        <p><span>말하길</span>에 오신 것을 환영합니다.</p>
        <p>원하는 <span>프로그램</span>을 선택하세요.</p>
      </div>
      <div className={styles.container}>
        {cards.map((card, index) => (
          <div className={styles.cardBorder} key={index} onClick={()=>{navigate(card.url)}}>
            <div className={styles.card}>
              <div className={styles.content}>
                <h2 className={styles.title}>{card.title}</h2>
                <p className={styles.text}>{card.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.cta} onClick={()=>{navigate('/')}}>
        <span className={styles.hoverUnderlineAnimation}>메인화면 바로가기</span>
        <svg viewBox="0 0 46 16" height="10" width="30" id="arrow-horizontal">
          <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
        </svg>
      </button>
    </div>
  );
};

export default MainPage2;
