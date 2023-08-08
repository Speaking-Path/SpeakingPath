import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import PickNameStart from './PickNameStart';
import PickNameMain from './PickNameMain';


function PickName() {
  const [startPicIsVisible, setStartPicIsVisible] = useState(true)
  const userId = useSelector((state)=>{return state.loginId})

  const [picList, setPicList] = useState({})

  const handlePicStartButtonClick = () => {
    setStartPicIsVisible(false)
  }

  const [num, setNum] = useState(0)
  const [qlist, setQlist] = useState({})


  const getPic = async function() {
    try {
      const response = await axios.post("practice/recog/qlist", null, { params:{"userId" : userId} });
      const responseData = response.data;
      setPicList(responseData);
  
      if (responseData.answerList && responseData.questionList && responseData.savedList) {
        const newQlist = {
          answerList: responseData.answerList[num],
          questionList: responseData.questionList[num],
          savedList: responseData.savedList[num]
        };
        setQlist(newQlist);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const goForward = function() {
    if (num !== 9) {
      setNum(num + 1);
      const newQlist = {
        answerList: picList.answerList[num + 1], // num + 1로 변경
        questionList: picList.questionList[num + 1],
        savedList: picList.savedList[num + 1]
      };
      setQlist(newQlist);
    }
  }

  const goBack = function() {
    if (num !== 0) {
      setNum(num - 1);
      const newQlist = {
        answerList: picList.answerList[num - 1], // num - 1로 변경
        questionList: picList.questionList[num - 1],
        savedList: picList.savedList[num - 1]
      };
      setQlist(newQlist);
    }
  }

  useEffect(() => {
    if (picList.answerList && picList.questionList && picList.savedList) {
      const newQlist = {
        answerList: picList.answerList[num],
        questionList: picList.questionList[num],
        savedList: picList.savedList[num]
      };
      setQlist(newQlist);
    }
  }, [num, picList]);

  console.log(num)

  return(
    <div>
      {
        startPicIsVisible ? (
          <PickNameStart onPicStartButtonClick={handlePicStartButtonClick} onGetPic={getPic}/>
        ) : (
          <PickNameMain qlist={qlist} num={num} goForward={goForward} goBack={goBack}/>
        )
      }
    </div>
  )
}

export default PickName