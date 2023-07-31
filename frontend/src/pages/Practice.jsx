import styles from './Practice.module.css'
import { useNavigate } from 'react-router-dom';

function Practice() {
  const navigate = useNavigate()

  return (
    <div className={styles.practice}>
<div className={`${styles.applystart} container`}>
        <p className={styles.title}><span className={styles.titleinfo}>원하는 훈련을 선택하세요</span></p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <div className={styles.line}>발음 훈련</div>
            <div className="row">
              <div className="col" onClick={(e) => { navigate("/practice/pron/syllable") }}>
                <p>음절 말하기</p>
                <img className={styles.img} src={process.env.PUBLIC_URL + "/assets/syllable.png"} alt="" />
                <p>간단한 발음으로</p>
                <p>시작하세요</p>
              </div>
              <div className="col" onClick={(e) => { navigate("/practice/pron/word") }}>
                <p>단어 말하기</p>
                <img className={styles.img} src={process.env.PUBLIC_URL + "/assets/word.png"} alt="" />
                <p>짧은 단어로</p>
                <p>연습하세요</p>
              </div>
              <div className="col" onClick={(e) => { navigate("/practice/pron/sentence") }}>
                <p>문장 말하기</p>
                <img className={styles.img} src={process.env.PUBLIC_URL + "/assets/sentence.png"} alt="" />
                <p>문장을 읽으며</p>
                <p>자연스럽게 말해요</p>
              </div>
            </div>
          </div>
          <div className="col-5">
          <div className={styles.line}>인지 훈련</div>
            <div className="row">
              <div className="col" onClick={(e) => { navigate("/practice/recog/select") }}>
                <p>사물 고르기</p>
                <img className={styles.img2} src={process.env.PUBLIC_URL + "/assets/pickname.png"} alt="" />
                <p>주어진 단어의</p>
                <p>사진을 골라 보세요</p>
              </div>
              <div className="col" onClick={(e) => { navigate("/practice/recog/select-name") }}>
                <p>사물 이름 맞히기</p>
                <img className={styles.img2} src={process.env.PUBLIC_URL + "/assets/pickpic.png"} alt="" />
                <p>사진을 보고</p>
                <p>이름을 맞춰 보세요</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Practice