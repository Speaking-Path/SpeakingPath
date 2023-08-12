import React, {useEffect} from 'react'
import axios from "axios"
// import Header from '../components/Header';
import Banner from '../components/MainPage/Banner';
import Banner2 from '../components/MainPage/Banner2';
import FirstPart from '../components/MainPage/FirstPart';
import ThirdPart from '../components/MainPage/ThirdPart'
import FourthPart from '../components/MainPage/FourthPart'
import FifthPart from '../components/MainPage/FifthPart';
import Banner3 from '../components/MainPage/Banner3';
import Banner5 from '../components/MainPage/Banner5';


const Main = () => {
  useEffect(() => {
    // 서버에서 정보를 가져오는 GET 요청을 보냅니다.
    axios.get('https://i9c109.p.ssafy.io')
      .then(response => {
        const accessToken = response.headers['accessToken'];
        const refreshToken = response.headers['refreshToken'];
        const grantType = response.headers['grantType'];

        if (accessToken && refreshToken && grantType) {
          // 응답에서 필요한 정보가 모두 제공된 경우 localStorage에 저장합니다.
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('grantType', grantType);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div>
      {/* <Header /> */}
      {/* <Banner2/> */}
      <FirstPart/>
      {/* <Banner3/> */}
      {/* <SecondPart/> */}
      <Banner2/>
      {/* <ThirdPart/> */}
      <ThirdPart/>
      <FourthPart/>
      {/* <Banner/> */}
      <FifthPart/>
      <Banner5/>
    </div>
  );
};

export default Main;
