import './App.css';
import NavBar from './components/NavBar/Navbar'
import { Routes, Route } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import ConsultantSignup from './pages/ConsultantSignup'
import UserInformation from './components/profile/UserInformation'



function App() {
  return (
    <div className="App">
      <NavBar/>
      {/* 루트 추가 여기에 */}
      <Routes>
        <Route path="/account/signup" element={<UserSignup/>}/>
        <Route path="/account/consultantsignup" element={<ConsultantSignup/>}/>
        <Route path="/profile/" element={<UserInformation />}></Route>
      </Routes>
    </div>
  );
}

export default App;
