import axios from "axios";
import { useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";

function CheckRsv() {
  // const userId = useSelector((state)=>{return state.loginId})
  const userInfo = useSelector((state)=>{return state.profileInfo})

  const tokenType = localStorage.getItem('tokenType')
  const accessToken = localStorage.getItem('accessToken')

  const [upcomingRsv, setUpcomingRsv] = useState([])



  useMemo(() => {

    if (userInfo && userInfo.userGrade === "USER") {
      axios.post("/cslting/upcomingrsv", {userId: userInfo.userId }
        // {
        //   headers: {
        //     Authorization: `${tokenType} ${accessToken}`
        //   }
        // },
        )
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post("/cslting/upcomingrsv", { userId: userInfo.userId }
      // {
      //   headers: {
      //     Authorization: `${tokenType} ${accessToken}`
      //   }
      // },
    )
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, []);


  return(
    <div>
      예약페이지
    </div>
  )
}

export default CheckRsv