// 네비게이션 바

import styles from './Navbar.module.css'
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import Dropdown from 'react-bootstrap/Dropdown';


function NavBar() {
  return (
    <Navbar bg="white" data-bs-theme="light">
      <Container>

      {/* <Nav className={`${styles.part1}`}>
          <NavLink className={styles.title}
            style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}
            to="practice">
            AI 언어재활</NavLink>

          <NavLink className={styles.title}
            style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}
            to="consulting">
            치료 상담</NavLink>
        </Nav> */}

    <Nav className={`${styles.part1}`}>
      {/* AI 언어재활 NavLink에 드롭다운 메뉴 추가 */}
      <Dropdown as={NavLink} className={styles.title} to="/practice">

        <Dropdown.Toggle as={NavLink} className={`${styles.title} dropdown-toggle`} 
        style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}>
          AI 언어재활
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.drdo_Menu_a}>
          <Dropdown.Item className={styles.drdo_b} as={NavLink} to="/syllable">발음 연습하기</Dropdown.Item>
          <Dropdown.Item className={styles.drdo_b} as={NavLink} to="/word">인지 연습하기</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* 치료 상담 NavLink
      <NavLink className={`${styles.title} ${styles.navLink}`} to="/consulting" activeClassName={styles.activeLink}>
        치료 상담
      </NavLink>*/}

    <Dropdown as={NavLink} className={styles.title} to="/practice" activeClassName={styles.activeLink}>
        <Dropdown.Toggle as={NavLink} className={`${styles.title} dropdown-toggle`} style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}>
          치료상담
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.drdo_Menu_a}>
          <Dropdown.Item className={styles.drdo_b} as={NavLink} to="/select">사물 고르기</Dropdown.Item>
          <Dropdown.Item className={styles.drdo_b} as={NavLink} to="/name_quiz">사물 이름 맞히기</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

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
        {/* <NavLink className="my-auto" to="">말하길</NavLink> */}
      </Nav>

        <Nav className={styles.part2}>
          <NavLink className={`${styles.lasttab} ms-auto`}
            style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}
            to="account/signup">
            회원가입</NavLink>

          <NavLink className={styles.lasttab}
            style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}
            to="account/login">
            로그인</NavLink>

          <NavLink className={styles.lasttab}
          style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}
          to="account/mypage">
          프로필</NavLink>

        </Nav>
      </Container>
    </Navbar>
  );
}

export { NavBar };