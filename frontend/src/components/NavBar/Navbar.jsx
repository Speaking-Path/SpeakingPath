// 네비게이션 바
import axios from "axios"
import styles from './Navbar.module.css'
import Container from 'react-bootstrap/Container'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
import { NavLink, useNavigate, useLocation} from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { changeLoginInfo } from '../../store/UserInfo'
import { useEffect, useRef, useState } from 'react'
import { changeProfileClick } from '../../store/profileInfo'
import { persistor } from "../../index.js";

function NavBar() {
  const loginToken = useSelector((state) => { return state.loginToken })
  const dispatch = useDispatch()

  const loginNow = localStorage.getItem("accessToken")
  const tokenType = localStorage.getItem("tokenType")
  const navigate = useNavigate()

  const profileClick = useSelector((state) => { return state.profileClick })
  const userInfo = useSelector((state)=>{return state.profileInfo})
  const [userGrade,setUserGrade] = useState(null)

  const location = useLocation();
  const profileDropdownRef=useRef(null);

  const handleLogout = async () => {
    // Clear login info and local storage
    dispatch(changeLoginInfo(""));
    localStorage.clear();

    // Send logout request
    try {
      const response = await axios.post("/account/logout", null, {
        headers: {
          Authorization: `${tokenType} ${loginNow}`,
        },
      });

      if (response.data === "success") {
        // Reset the store and rehydrate with initial values
        await persistor.purge();
        await persistor.flush();

        // Reload the page
        window.location.reload("/");
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (!loginNow) {
      navigate("/");
    }
  }, [loginNow])

  function locationStartWith(path) {
    if (location.pathname.startsWith(path))
      return true;
    return false;
  }

  useEffect(()=>{
    if(profileDropdownRef.current){
      profileDropdownRef.current.children[0].onclick=()=>{
        dispatch(changeProfileClick(0));
        navigate("/account/mypage"); 
      }
    }
  },[profileDropdownRef.current])


  return (
    <div>
      <Navbar bg="white" data-bs-theme="light">
        <Container>
          <Nav className={`${styles.part1} align-items-center`}>
            <NavDropdown className={`${styles.hoverdropdown} ${ locationStartWith("/practice") && styles.selected }`} title="언어재활" renderMenuOnMount={true} onClick={() => { navigate("/practice") }}>
              {
                loginToken ? (
                  <>
                    <NavDropdown.Item href="/#/practice/pron/syllable">음절 말하기</NavDropdown.Item>
                    <NavDropdown.Item href="/#/practice/pron/word">단어 말하기</NavDropdown.Item>
                    <NavDropdown.Item href="/#/practice/pron/sentence">문장 말하기</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/#/practice/recog/select">사물 고르기</NavDropdown.Item>
                    <NavDropdown.Item href="/#/practice/recog/select-name">사물 이름 맞히기</NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item href="/#/account/login">음절 말하기</NavDropdown.Item>
                    <NavDropdown.Item href="/#/account/login">단어 말하기</NavDropdown.Item>
                    <NavDropdown.Item href="/#/account/login">문장 말하기</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/#/account/login">사물 고르기</NavDropdown.Item>
                    <NavDropdown.Item href="/#/account/login">사물 이름 맞히기</NavDropdown.Item>
                  </>
                )
              }
            </NavDropdown>
            <NavLink className={`${styles.title} ${locationStartWith("/consulting") && styles.selected}`} to="consulting">치료상담</NavLink>
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

          <Nav className={`${styles.part2} align-items-center`}>
            {
              loginToken ? (
                <>
                  <NavDropdown ref={profileDropdownRef} className={`${styles.hoverdropdown} ${locationStartWith("/account/mypage") && styles.selected}`} title="프로필" renderMenuOnMount={true}>
                    <NavDropdown.Item href="/#/account/mypage" onClick={() => { dispatch(changeProfileClick(0)) }}>내 정보</NavDropdown.Item>
                    <NavDropdown.Item href="/#/account/mypage/checkrsv" onClick={() => { dispatch(changeProfileClick(1)) }}>예정된 상담</NavDropdown.Item>
                    <NavDropdown.Item href="/#/account/mypage/pastrsv" onClick={() => { dispatch(changeProfileClick(2)) }}>지난 상담</NavDropdown.Item>
                    <NavDropdown.Item href="/#/account/mypage/items" onClick={() => { dispatch(changeProfileClick(4)) }}>훈련 즐겨찾기</NavDropdown.Item>
                    {/* <NavDropdown.Item href="/#/account/mypage">내 화면 보기</NavDropdown.Item> */}
                    {
                      userInfo && userInfo.userGrade === "CONSULTANT" ? (
                        <NavDropdown.Item href="/#/account/mypage/consultrsv" onClick={() => { dispatch(changeProfileClick(3)) }}>예약 시간 지정</NavDropdown.Item>
                      ) : (
                        null
                      )
                    }
                  </NavDropdown>

                  <NavLink className={styles.title} onClick={handleLogout}>
                    로그아웃
                  </NavLink>
                </>

              ) :
                (
                  <div>
                    <NavLink className={`${styles.title} ms-auto`}
                      style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}
                      to="account/signup">
                      회원가입</NavLink>

                    <NavLink className={styles.title}
                      style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "", color: isActive ? 'blue' : '', } }}
                      to="account/login">
                      로그인</NavLink>
                  </div>
                )
            }
          </Nav>
        </Container>
      </Navbar>
      <div className={`${styles.drdn} container`}>
      </div>
    </div>


  )
}

export default NavBar