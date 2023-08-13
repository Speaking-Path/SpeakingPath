import './App.css';
// import NavBar from './components/NavBar/Navbar'
import { Routes, Route } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import ConsultantSignup from './pages/ConsultantSignup'
import UserInformation from './pages/UserInformation'
import Login from './pages/Login'
import NavBar from './components/NavBar/Navbar';
import MainPage from './pages/MainPage';
import UntactConsult from './components/Video/Untact'
import Consultant from './pages/Consultant'
import Reservation from './pages/Reservation'
import CsltCalendar from './components/MyPage/ConsultantCalendar';
import Practice from './pages/Practice';
import PickName from './components/Practice/Recognition/PickName';
import PickPic from './components/Practice/Recognition/PickPic';
import Sentence from './components/Practice/Pronunciation/Sentence';
import Syllable from './components/Practice/Pronunciation/Syllable';
import Word from './components/Practice/Pronunciation/Word';
import Profile from './components/MyPage/Profile';
import CheckRsv from './components/MyPage/CheckRsv';
import PastRsv from './components/MyPage/PastRsv';
import Footer from './components/Footer/Footer';
import FindId from './pages/FindUserId';
import FindPwd from './pages/FindUserPwd';
import ErrorPage from './pages/ErrorPage';
import SavedItems from './components/MyPage/SavedItems';
import PronStart from './components/Practice/Pronunciation/PronStart';
import { useEffect } from 'react';
import MainPage2 from './pages/MainPage2';



function App() {
    // 로딩이 끝난 후에 실행되는 useEffect를 이용하여 값을 추출하고 로컬 스토리지에 저장
    useEffect(() => {
      // 현재 페이지 URL에서 해시 부분을 추출
      const hash = window.location.hash.substring(1);
  
      // 해시를 & 문자로 분리하여 키-값 쌍 배열로 변환
      const hashParams = hash.split("&").reduce(function (result, item) {
        const parts = item.split("=");
        result[parts[0]] = decodeURIComponent(parts[1]);
        return result;
      }, {});
  
      // 추출한 값 사용
      const accessToken = hashParams.accessToken;
      const refreshToken = hashParams.refreshToken;
      const grantType = hashParams.grantType;
  
      // 추출한 값 확인
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("Grant Type:", grantType);
  
      // 추출한 값을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("grantType", grantType);
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때에만 실행
    
  return (
    <div className="App">
      <div className='AppWrapper'>
      <NavBar />
      {/* 루트 추가 여기에 */}
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path='/loginmain' element={<MainPage2/>}/>
        <Route path="/account/signup" element={<UserSignup />} />
        <Route path="/account/consultantsignup" element={<ConsultantSignup />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/findid" element={<FindId />} />
        <Route path="/account/findpwd" element={<FindPwd />} />

          <Route path="/account/mypage" element={<UserInformation />}>
            <Route path="" element={<Profile />} />
            <Route path="checkrsv" element={<CheckRsv />} />
            <Route path="pastrsv" element={<PastRsv />} />
            <Route path="consultrsv" element={<CsltCalendar />} />
            <Route path="items" element={<SavedItems/>} />
          </Route>

          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/pron/syllable" element={<Syllable />} />
          <Route path="/practice/pron/word" element={<Word />} />
          <Route path="/practice/pron/sentence" element={<Sentence />} />
          <Route path="/practice/pron/start" element={<PronStart/>}/>
          <Route path="/practice/pron/start/syllable" element={<PronStart type="syllable"/>}/>
          <Route path="/practice/pron/start/word" element={<PronStart type="word"/>}/>
          <Route path="/practice/pron/start/sentence" element={<PronStart type="sentence"/>}/>
          <Route path="/practice/recog/select" element={<PickPic />} />
          <Route path="/practice/recog/select-name" element={<PickName />} />

          <Route path="/consulting" element={<Consultant />} />
          <Route path="/consulting/reservation" element={<Reservation />} />


        {/* 방 생성 방법 백이랑 결정해서 주소변경필요 */}
        <Route path="/consulting/meeting" element={<UntactConsult />} />
        <Route path="/error" element={<ErrorPage />} /> {/* element prop 사용 */}
      </Routes>

    </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;