import './App.css';
// import NavBar from './components/NavBar/Navbar'
import { Routes, Route } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import ConsultantSignup from './pages/ConsultantSignup'
import UserInformation from './components/profile/UserInformation'
import Login from './pages/Login'
import UntactConsult from './components/Video/Untact';
import { NavBar } from './components/NavBar/Navbar';
import MainPage from './pages/MainPage';


function App() {
  return (
    <div className="App">
      <NavBar/> 
      {/* 루트 추가 여기에 */}
      <Routes>
      <Route exact path="/" element={<MainPage/>} />
        <Route path="/account/signup" element={<UserSignup/>}/>
        <Route path="/account/consultantsignup" element={<ConsultantSignup/>}/>
        <Route path="/account/mypage" element={<UserInformation />}/>
        <Route path="/account/login" element={<Login/>}/>
        {/* 방 생성 방법 백이랑 결정해서 주소변경필요 */}
        <Route path="/practice/consulting/meeting" element={<UntactConsult/>}/>
      </Routes>
    </div>
  );
}

export default App;
