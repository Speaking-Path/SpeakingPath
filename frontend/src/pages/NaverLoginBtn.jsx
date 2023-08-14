import { useState, useEffect, useRef } from "react"
import styles from './NaverLoginBtn.module.css'

function NaverLoginBtn() {
  const naverRef = useRef()
  useEffect(() => {
    let naverLogin = new window.naver.LoginWithNaverId({
      clientId: `${process.env.REACT_APP_CLIENT_ID}`,
      callbackUrl: `http://i9c109.p.ssafy.io/#/account/naverlogin`,
      loginButton: { color: "green", type: 3, height: "45" },
    });
    naverLogin.init();
    naverLogin.logout();
    try {
      naverLogin.getLoginStatus((status) => {
        if (status) {
          // console.log(naverLogin.user);
        } else {
          // console.log(naverLogin)
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    naverRef.current.children[0].style.display = 'none';
  }, []);
  
  const handleClick = () => {
    naverRef.current.children[0].click();
  }

  return (
    <>
      <div ref={naverRef} id="naverIdLogin"></div>
      <button onClick={handleClick} className={styles.naver} >
        <img src={process.env.PUBLIC_URL + "/assets/naver.png"} alt="naver" />
        네이버 로그인
      </button>
    </>
  )

}

export default NaverLoginBtn