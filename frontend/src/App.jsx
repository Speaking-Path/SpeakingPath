import './App.css';
import NavBar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import UserInformation from './components/profile/UserInformation'
import Signup from './pages/Signup'



function App() {
  return (
    <div className="App">
      <NavBar/>
      {/* 루트 추가 여기에 */}
      <Routes>
        <Route path="/account/signup" element={<Signup/>}/>
        <Route path="/profile/" element={<UserInformation />}></Route>
      </Routes>
    </div>
  );
}

export default App;
