// 네비게이션 바

import styles from './Navbar.module.css'
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeLoginInfo } from '../../store/UserInfo';
import { useEffect } from 'react';


function NavBar() {
  const loginToken = useSelector((state) => { return state.loginToken })
  const dispatch = useDispatch()

  console.log(loginToken)



  return (
    <div>
      <Navbar bg="white" data-bs-theme="light">
        <Container>
          <Nav className={`${styles.part1}`}>
            <NavLink className={styles.title} to="practice"> AI 언어재활</NavLink>
            <NavLink className={styles.title} to="practice/consulting"> 치료 상담</NavLink>
          </Nav>

          <Nav>
            <Navbar.Brand href="">
              <a href="http://localhost:3000/">
                <img
                  src={process.env.PUBLIC_URL + "/assets/main/main_logo.png"}
                  alt="Main Logo"
                  className={styles.logo_img}
                />
              </a>
            </Navbar.Brand>
          </Nav>

          <Nav className={styles.part2}>
            {
              loginToken ? (
                <div>
                  <NavLink className={styles.lasttab}
                    style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}
                    to="account/mypage">
                    프로필</NavLink>

                  <NavLink className={styles.lasttab} onClick={() => {
                    dispatch(changeLoginInfo(""))
                    localStorage.clear()
                  }}>
                    로그아웃</NavLink>
                </div>

              ) :
                (
                  <div>
                    <NavLink className={`${styles.lasttab} ms-auto`}
                      style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}
                      to="account/signup">
                      회원가입</NavLink>

                    <NavLink className={styles.lasttab}
                      style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}
                      to="account/login">
                      로그인</NavLink>
                  </div>
                )
            }



          </Nav>
        </Container>
      </Navbar>
      <div>
        <ul>
          <li>발음 연습하기</li>
          <ul>
            <li>음절 말하기</li>
            <li>단어 말하기</li>
            <li>문장 말하기</li>
          </ul>
        </ul>
        <ul>
          <li>인지 연습하기</li>
          <ul>
            <li>사물 고르기</li>
            <li>사물 이름 맞히기</li>
          </ul>
        </ul>
        <div>
          <p>필요한</p>
          <p>카테고리를</p>
          <p>선택해</p>
          <p>학습하세요</p>
        </div>
      </div>
    </div>
  );
}

export { NavBar };