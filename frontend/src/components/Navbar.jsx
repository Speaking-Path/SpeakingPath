import './Navbar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="">
            <img src={process.env.PUBLIC_URL + "/assets/logo.png"} alt="" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="practice">AI 언어재활</Nav.Link>
            <Nav.Link href="consulting">치료 상담</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;