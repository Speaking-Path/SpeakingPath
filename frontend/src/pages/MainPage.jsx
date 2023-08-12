import React from 'react';
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
