// 네비게이션 바

import styles from './Navbar.module.css'
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeLoginInfo } from '../../store/UserInfo';
import { useEffect } from 'react';


function NavBar() {
  const loginToken = useSelector((state) => { return state.loginToken })
  const dispatch = useDispatch()

  const loginNow = localStorage.getItem("accessToken")
  const navigate = useNavigate()

  useEffect(()=>{
  }, [loginNow])


  return (
    <div>
      <Navbar bg="white" data-bs-theme="light">
        <Container>
          <Nav className={`${styles.part1}`}>
            <NavLink className={styles.title} to="practice">언어재활</NavLink>
            <NavLink className={styles.title} to="practice/consulting">치료상담</NavLink>
          </Nav>

          <Nav>
            <Navbar.Brand href="">
              <a href="/">
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
              localStorage.getItem("accessToken") ? (
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
        <hr />
      </Navbar>
      <div className={`${styles.drdn} container`}>
      </div>
    </div>

    
  );
}

export default NavBar