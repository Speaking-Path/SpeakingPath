// FindUserPwd.js

import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserLogin.module.css";
import axios from "axios"

function FindUserPwd() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resetLinkSent, setResetLinkSent] = useState(false);

  // Assuming you have a function to send reset password link
  async function sendResetLink() {
    axios
    .post(`/account/find/pwd`, { "userEmail": email, "userName": name })
    .then((res) => {
      console.log(res)
      if (res.data === "success") {
        setResetLinkSent(true)
      } else {
        alert("비밀번호 초기화에 실패하였습니다.\n다시 시도해주시기 바랍니다.")
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className={`${styles.box} d-inline-flex`}>
      <form className={styles.form}>
        <p className={`${styles.title}`}>비밀번호 재설정</p>
        <div>
          <label className={styles.label} htmlFor="id">
            이름
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={name}
            placeholder="이름 입력"
            onChange={(e) => {
              setName(e.target.value);
              setResetLinkSent(false); // Clear reset link status when ID changes
            }}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="email">
            이메일
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            placeholder="이메일 입력"
            onChange={(e) => {
              setEmail(e.target.value);
              setResetLinkSent(false); // Clear reset link status when email changes
            }}
          />
        </div>

        <button
          className={styles.loginBtn}
          variant="contained"
          onClick={async (e) => {
            e.preventDefault();
            await sendResetLink();
          }}
        >
          재설정 링크 보내기
        </button>

        {resetLinkSent && (
          <div className={styles.resetLinkSentMessage}>
            <p>비밀번호 재설정 링크가 이메일로 전송되었습니다.</p>
          </div>
        )}

        <div className={styles.goBack}>
          <NavLink className={styles.forgot} to="/account/login">
            로그인 페이지로 돌아가기
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default FindUserPwd;
