import styles from './Footer.module.css'

const Footer = () => {
  return(
    <div className={styles.footer}>
      <img src={process.env.PUBLIC_URL + "/assets/main/main_logo.png"} alt="" />
      <p>말하길에 사용된 모든 영상의 출처는 어디... 입니다.</p>
      <p>Team 쌍둥이 사자, 두 명의 사수, 그리고 물병 안의 물고기</p>
      <p>ⓒ 2023 말하길</p>
    </div>
  )
}

export default Footer