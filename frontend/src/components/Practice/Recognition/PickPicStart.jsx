import styles from './PickStart.module.css'



function PickPicStart({ onPicStartButtonClick, onGetPic }) {


  return (
    <div className={styles.startBox}>
      <div className={styles.textBox}>
        <p className={styles.TitleText1}>사물 고르기</p>
        <p className={styles.TitleText2}>주어진 단어에 알맞은 사진을 골라보세요.</p>
        <button onClick={() => { onPicStartButtonClick(); onGetPic(); }}>시작하기</button>
      </div>
      <div className={styles.imgBox}>
        <img src={process.env.PUBLIC_URL + "/assets/Recog/pickpic.jpg"} alt="" />
      </div>
    </div>
  )
}

export default PickPicStart