// 네비게이션 바

import './Navbar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="">
            <img src={process.env.PUBLIC_URL + "/assets/logo.png"} alt="" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink
              style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", } }}
              to="practice">
              AI 언어재활</NavLink>
            <NavLink
              style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", } }}
              to="consulting">
              치료 상담</NavLink>
          </Nav>
          <Nav className="me-auto">
            <NavLink
              style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", } }}
              to="account/signup">
              회원가입</NavLink>
             <Nav.Link href="profile">프로필</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}


export default NavBar;