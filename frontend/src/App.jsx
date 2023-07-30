import './App.css';
// import NavBar from './components/NavBar/Navbar'
import { Routes, Route } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import ConsultantSignup from './pages/ConsultantSignup'
import UserInformation from './components/profile/UserInformation'
import Login from './pages/Login'
import { NavBar } from './components/NavBar/Navbar';
import MainPage from './pages/MainPage';
import UntactConsult from './components/Video/Untact'
import Consultant from './pages/Consultant'
import Reservation from './pages/Reservation'
import CsltCalendar from './components/Reservation/ConsultantCalendar';
import Practice from './pages/Practice';
import PickName from './components/Practice/PickName';
import PickPic from './components/Practice/PickPic';
import Sentence from './components/Practice/Sentence';
import Syllable from './components/Practice/Syllable';
import Word from './components/Practice/Word';



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

        <Route path="/practice" element={<Practice/>}/>
        <Route path="/practice/pron/syllable" element={<Syllable/>}/>
        <Route path="/practice/pron/word" element={<Word/>}/>
        <Route path="/practice/pron/sentence" element={<Sentence/>}/>
        <Route path="/practice/recog/select" element={<PickName/>}/>
        <Route path="/practice/recog/select-name" element={<PickPic/>}/>

        <Route path="/consulting" element={<Consultant/>}/>
        <Route path="/consulting/reservation/:csltid" element={<Reservation/>}/>
        <Route path="/consulting/rev" element={<CsltCalendar/>}/>
        {/* 방 생성 방법 백이랑 결정해서 주소변경필요 */}
        <Route path="/consulting/meeting" element={<UntactConsult/>}/>
      </Routes>
    </div>
  );
}

export default App;
