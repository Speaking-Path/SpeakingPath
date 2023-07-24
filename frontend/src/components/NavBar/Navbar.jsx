// 네비게이션 바

import styles from './Navbar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar bg="white" data-bs-theme="light">
      <Container>
        <Nav className={`${styles.part2} me-auto`}>
          <Navbar.Brand href="">
            <img src={process.env.PUBLIC_URL + "/assets/logo.png"} alt="" />
          </Navbar.Brand>
          <NavLink className="my-auto" to="">말하길</NavLink>
        </Nav>
        <Nav className={`${styles.part} d-flex justify-content-center`}>
          <NavLink className={styles.title}
            style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", } }}
            to="practice">
            언어재활</NavLink>
          <NavLink className={styles.title}
            style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", } }}
            to="consulting">
            치료상담</NavLink>
          <NavLink className={styles.title}
            style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", } }}
            to="/practice/consulting/meeting">
            화상상담</NavLink>
        </Nav>
        <Nav className={styles.part2}>
          <NavLink className={`${styles.lasttab} ms-auto`}
            style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", } }}
            to="account/signup">
            회원가입</NavLink>
          <NavLink className={styles.lasttab}
            style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", } }}
            to="account/login">
            로그인</NavLink>
          <NavLink className={styles.lasttab} to="account/mypage" >프로필</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}


export default NavBar;