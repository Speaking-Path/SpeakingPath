import { useEffect, useState } from 'react';
import styles from './PickStart.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from 'react-router';


function PickPicStart({ onPicStartButtonClick, onGetPic }) {
  const [useInfo, setUseInfo] = useState(0)
  const navigate = useNavigate()


  useEffect(() => {
    // 페이지가 렌더링된 후에 실행되는 부분
    window.scrollTo({ top: 110, behavior: 'smooth' }); // 컴포넌트 상단으로 스크롤 이동
  }, []);

  return (
    <div>
    {
      useInfo === 0 ?
    <div className={styles.startBox}>
      <div className={styles.imgBox}>
        <img src={process.env.PUBLIC_URL + "/assets/Recog/pickpic.jpg"} alt="" />
      </div>
      <div className={styles.textBox}>
        <p className={styles.TitleText1}>사물 고르기</p>
        <p className={styles.TitleText2}>주어진 단어에 알맞은 사진을 골라보세요.</p>
        <div className={styles.wrap}>
        <button onClick={() => { setUseInfo(1) }}>이용방법</button>
        <button onClick={() => { onPicStartButtonClick(); onGetPic(); }}>시작하기</button>
        </div>
        <div className={styles.out} onClick={()=>{navigate("/practice")}}>
                <span>나가기</span>
              </div>
      </div>
    </div> :
          <div className={styles.infoBox}>
            <p>이용방법</p>
          {
            useInfo === 1 && <div className={styles.infoPic1}>
              <ArrowBackIcon sx={{ fontSize: 50 }} style={{ visibility: 'hidden' }}/>
              <img className={styles.infoImg} src={process.env.PUBLIC_URL + "/assets/useinfo/pickpic1.png"} alt="" />
              <ArrowForwardIcon sx={{ fontSize: 50 }} onClick={() => { setUseInfo(2) }}/>
            </div>
          }
          {
            useInfo === 2 && <div className={styles.infoPic2}>
              <ArrowBackIcon sx={{ fontSize: 50 }} onClick={() => { setUseInfo(1) }}/>
              <img className={styles.infoImg} src={process.env.PUBLIC_URL + "/assets/useinfo/pickpic2.png"} alt="" />
              <ArrowForwardIcon sx={{ fontSize: 50 }} onClick={() => { setUseInfo(3) }}/>
            </div>
          }
          {
            useInfo === 3 && <div className={styles.infoPic3}>
              <ArrowBackIcon sx={{ fontSize: 50 }} onClick={() => { setUseInfo(2) }}/>
              <img className={styles.infoImg} src={process.env.PUBLIC_URL + "/assets/useinfo/pickpic3.png"} alt="" />
              <ArrowOutwardIcon sx={{ fontSize: 50 }} onClick={() => { setUseInfo(0) }}/>
            </div>
          }
          </div>
      }
    </div>
  )
}

export default PickPicStart