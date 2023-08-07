import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './ErrorPage.module.css'; // 스타일 파일을 불러옴

const ErrorPage = ({ message }) => {

  return (
    <div className={styles.errorContainer}> {/* 스타일을 적용할 컨테이너 추가 */}
      <h1>잘못된 접근입니다.</h1>
      <p>{message}</p>
      <img className={styles.errorImage} src='/assets/errorPage.jpg' alt="Error"></img> {/* 스타일을 적용할 이미지 태그 */}
      <div>
        <NavLink to="/" className={styles.errorNavLink}>
          메인 페이지로 돌아가기
        </NavLink>
      </div>
    </div>
  )
}

export default ErrorPage;
