import './App.css';
import NavBar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'



function App() {
  return (
    <div className="App">
      <NavBar/>


      {/* 루트 추가 여기에 */}
      <Routes>
        <Route path="/account/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
