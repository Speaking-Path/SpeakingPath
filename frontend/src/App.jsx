import './App.css';
import NavBar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import UserInformation from './components/profile/UserInformation'



function App() {
  return (
    <div className="App">
      <NavBar/>
        <Routes>
          <Route path="/profile/" element={<UserInformation />}></Route>
        </Routes>
    </div>
  );
}

export default App;
