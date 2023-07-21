import './App.css';
import NavBar from './components/NavBar/Navbar'
import { Routes, Route } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import ConsultantSignup from './pages/ConsultantSignup'
import UserInformation from './components/profile/UserInformation'
import Consulting from './pages/Consulting'
import Meeting from './components/Consulting/Meeting'
import Login from './pages/Login'



function App() {
  return (
    <div className="App">
      <NavBar/>
      {/* 루트 추가 여기에 */}
      <Routes>
        <Route path="/account/signup" element={<UserSignup/>}/>
        <Route path="/account/consultantsignup" element={<ConsultantSignup/>}/>
        <Route path="/account/mypage" element={<UserInformation />}/>
        <Route path="/account/login" element={<Login/>}/>
        <Route path="/consulting" element={<Consulting />}/>
        <Route path="/consulting/meeting" element={<Meeting />}/>
      </Routes>
    </div>
  );
}

export default App;
