import styles from './PickStart.module.css'



function PickPicStart({ onPicStartButtonClick, onGetPic }) {


  return (
    <div className={styles.startBox}>
      <div className={styles.textBox}>
        <p className={styles.TitleText1}>이름 맞히기</p>
        <p className={styles.TitleText2}>주어진 사진에 알맞은 단어를 말해보세요.</p>
        <div className={styles.wrap}>
        <button onClick={() => { onPicStartButtonClick(); onGetPic(); }}>시작하기</button>
        </div>
      </div>
      <div className={styles.imgBox}>
        <img src={process.env.PUBLIC_URL + "/assets/Recog/pickname.jpg"} alt="" />
      </div>
    </div>
  )
}

export default PickPicStart