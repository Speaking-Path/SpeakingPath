// FindUserId.js

import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserLogin.module.css";
import axios from "axios";

function FindUserId() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [foundId, setFoundId] = useState("");

  // Assuming you have a function to fetch user ID based on name and email
  async function findUserId() {
    axios
    .post(`/account/find/id`, { "userEmail": email, "userName": name })
    .then((res) => {
      if (res.data) {
        setFoundId(res.data)
      } else {
        setFoundId("인증에 실패하였습니다.")
      }
    })
    .catch((err) => {
      // console.log(err)
    })
  }

  return (
    <div className={`${styles.box} d-inline-flex`}>
      <form className={styles.form}>
        <p className={`${styles.title}`}>아이디 찾기</p>
        <div>
          <label className={styles.label} htmlFor="name">
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
              setFoundId(""); // Clear found ID when name changes
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
              setFoundId(""); // Clear found ID when email changes
            }}
          />
        </div>

        <button
          className={styles.loginBtn}
          variant="contained"
          onClick={async (e) => {
            e.preventDefault();
            await findUserId();
          }}
        >
          아이디 찾기
        </button>

        {foundId && (
          <div className={styles.foundIdMessage}>
            <p>찾으시는 아이디: {foundId}</p>
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

export default FindUserId;
