import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.text1}>
        <p>ⓒ 2023 말하길</p>
        <p>말하길에 사용된 모든 영상의 출처는 고려사이버대학교입니다.</p>
        <p>Team 쌍둥이 사자, 두 명의 사수, 그리고 물병 안의 물고기</p>
      </div>
      <div className={styles.img}>
        <img src={process.env.PUBLIC_URL + "/assets/main/main_logo.png"} alt="" />
      </div>
    </div>
  )
}

export default Footer