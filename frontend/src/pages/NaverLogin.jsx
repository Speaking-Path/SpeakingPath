import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"
import { changeLoginId, changeLoginInfo } from "../store/UserInfo"
import axios from 'axios'

const RedirectURI = () => {
    const navigate = useNavigate();
    
    const location = useLocation();  
    const dispatch = useDispatch()

    const getNaverToken = () => {
        if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0]; //token 출력
        console.log(token)
        axios.get(`/account/getuserinfobytoken`,  { params:{
            "access_token": token}
        }, {
            withCredentials: true
        })
        .then((response)=> {
            console.log(response.data)
            localStorage.clear()
            localStorage.setItem('tokenType', "Bearer ")
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            console.log("id: "+response.data.grantType)
            navigate("/")
            const ACCESS_TOKEN = localStorage.getItem("accessToken")
            dispatch(changeLoginInfo(ACCESS_TOKEN))
            dispatch(changeLoginId(response.data.grantType))
        //서버측에서 로직이 완료되면 홈으로 보내준다
        })
    };


    useEffect(() => {
        getNaverToken();
      // 백엔드로 코드값을 넘겨주는 로직
      // 요청 성공 코드값
      const hash = window.location.hash;
      // 해시값을 파싱하여 키-값 쌍으로 변환
      console.log(hash)
      const hashParams = new URLSearchParams(hash.split('#')[2]);
      
      // access_token 값 추출
      const accessToken = hashParams.get("access_token");
  
      // 요청이 성공하면 navigate('/main')
    });

  return (
    <div>
        네이버 로그인 중...    
    </div>
  );
};

export default RedirectURI;