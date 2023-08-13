import { useState, useEffect } from "react"

function NaverLoginBtn () {
    useEffect(() => {
        let naverLogin = new window.naver.LoginWithNaverId({
          clientId: `${process.env.REACT_APP_CLIENT_ID}`,
          callbackUrl: `http://localhost:3000/#/account/naverlogin`,
          loginButton: { color: "green", type: 3, height: "50" },
        });
        naverLogin.init();
        naverLogin.logout();
        try {
          naverLogin.getLoginStatus((status) => {
            if (status) {
              console.log(naverLogin.user);
            }else{
              console.log(naverLogin)
            }
          });
        } catch (err) {
          console.log(err);
        }
      }, []);

    return (
        <div id="naverIdLogin"></div>
    )
      
}

export default NaverLoginBtn