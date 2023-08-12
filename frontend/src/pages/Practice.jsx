import { useSelector } from 'react-redux';
import styles from './Practice.module.css'
import { useNavigate } from 'react-router-dom';



function Practice() {
  const navigate = useNavigate()
  const loginToken = useSelector((state) => { return state.loginToken })

  return (
    <div className={styles.practice}>
      <img className={styles.practiceBanner}
      src={process.env.PUBLIC_URL + "/assets/practicebanner.png"} alt="" />

      {/* <div className={`${styles.applystart} container`}>
        <p className={styles.title}><span className={styles.titleinfo}>원하는 훈련을 선택하세요</span></p>
      </div> */}
      <div className="container">
        <div className="row">
          <div className="col-7">
            <div className={styles.line}><span>발음 훈련</span></div>
            <div className="row">
              <div className={`${styles.pracList} col`} onClick={(e) => { 
                const userInfo = localStorage.getItem("accessToken");
                if (!loginToken) {
                  navigate("/account/login"); // userInfo가 없으면 로그인 페이지로 이동
                }else{
                  navigate("/practice/pron/syllable")
                }
                }}>
                <p className={`${styles.pracTitle}`}>음절 말하기</p>
                <img className={styles.img} src={process.env.PUBLIC_URL + "/assets/syllable.png"} alt="" />
                <div className={styles.pracDesc}>
                  <p>간단한 발음으로</p>
                  <p>시작하세요</p>
                </div>
              </div>
              <div className={`${styles.pracList} col`} onClick={(e) => { 
                const userInfo = localStorage.getItem("accessToken");
                if (!loginToken) {
                  navigate("/account/login"); // userInfo가 없으면 로그인 페이지로 이동
                }else{
                  navigate("/practice/pron/word")
                }
                 }}>
                <p className={`${styles.pracTitle}`}>단어 말하기</p>
                <img className={styles.img} src={process.env.PUBLIC_URL + "/assets/word.png"} alt="" />
                <div className={styles.pracDesc}>
                  <p>짧은 단어로</p>
                  <p>연습하세요</p>
                </div>
              </div>
              <div className={`${styles.pracList} col`} onClick={(e) => { 
                const userInfo = localStorage.getItem("accessToken");
                if (!loginToken) {
                  navigate("/account/login"); // userInfo가 없으면 로그인 페이지로 이동
                }else{
                  navigate("/practice/pron/sentence") 
                }
              }}>
                <p className={`${styles.pracTitle}`}>문장 말하기</p>
                <img className={styles.img} src={process.env.PUBLIC_URL + "/assets/sentence.png"} alt="" />
                <div className={styles.pracDesc}>
                  <p>문장을 읽으며</p>
                  <p>자연스럽게 말해요</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className={styles.line2}><span>인지 훈련</span></div>
            <div className="row">
              <div className={`${styles.pracList2} offset-1 col-4`} onClick={(e) => { 
                const userInfo = localStorage.getItem("accessToken");
                if (!loginToken) {
                  navigate("/account/login"); // userInfo가 없으면 로그인 페이지로 이동
                }else{
                  navigate("/practice/recog/select")
                }
                 }}>
                <p className={`${styles.pracTitle}`}>사물 고르기</p>
                <img className={styles.img2} src={process.env.PUBLIC_URL + "/assets/pickpic.png"} alt="" />
                <div className={styles.pracDesc2}>
                  <p>주어진 단어의</p>
                  <p>사진을 골라 보세요</p>
                </div>
              </div>
              <div className={`${styles.pracList2} offset-2 col-4`} onClick={(e) => { 
                const userInfo = localStorage.getItem("accessToken");
                if (!loginToken) {
                  navigate("/account/login"); // userInfo가 없으면 로그인 페이지로 이동
                }else{
                  navigate("/practice/recog/select-name")
                }
                 }}>
                <p className={`${styles.pracTitle}`}>사물 이름 맞히기</p>
                <img className={styles.img2} src={process.env.PUBLIC_URL + "/assets/pickname.png"} alt="" />
                <div className={styles.pracDesc2}>
                  <p>사진을 보고</p>
                  <p>이름을 맞혀 보세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Practice