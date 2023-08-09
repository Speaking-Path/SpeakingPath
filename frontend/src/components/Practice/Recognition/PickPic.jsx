import { useEffect, useState } from "react"
import PickPicStart from "./PickPicStart"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import PickPicMain from "./PickPicMain"
import { changeRecogNum } from "../../../store/recog"



function PickPic() {
  const [startPicIsVisible, setStartPicIsVisible] = useState(true)
  const userId = useSelector((state)=>{return state.loginId})
  const dispatch = useDispatch()

  const [picList, setPicList] = useState({})

  const handlePicStartButtonClick = () => {
    setStartPicIsVisible(false)
  }

  // const [num, setNum] = useState(0)
  const num = useSelector((state)=>{return state.recogNum})
  const [qlist, setQlist] = useState({})


  const getPic = async function() {
    dispatch(changeRecogNum(0))
    try {
      const response = await axios.post("practice/recog/object/qlist", {"userId" : userId});
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
      dispatch(changeRecogNum(num + 1))
      const newQlist = {
        answerList: picList.answerList[num + 1],
        questionList: picList.questionList[num + 1],
        savedList: picList.savedList[num + 1]
      };
      setQlist(newQlist);
    }
  }

  const goBack = function() {
    if (num !== 0) {
      dispatch(changeRecogNum(num - 1))
      const newQlist = {
        answerList: picList.answerList[num - 1],
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

  const retry = function() {
    dispatch(changeRecogNum(0))
    setStartPicIsVisible(true)
  }


  return(
    <div>
      {
        startPicIsVisible ? (
          <PickPicStart onPicStartButtonClick={handlePicStartButtonClick} onGetPic={getPic}/>
        ) : (
          <PickPicMain qlist={qlist} goForward={goForward} goBack={goBack} retry={retry}/>
        )
      }
    </div>
  )
}

export default PickPic