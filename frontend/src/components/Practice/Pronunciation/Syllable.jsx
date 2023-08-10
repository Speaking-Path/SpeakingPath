// import { useState } from "react";
// import Confetti from "../Confetti"
// import CelebratePron from "../CelebratePron"
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { changeCorrect } from "../../../store/pron";
// import { changeWrong } from "../../../store/pron";
// import RetryPron from '../RetryPron';
// import WrongConfetti from '../WrongConfetti';
import Entry from "./Entry";


function Syllable() {
  // const pronCorrect = useSelector((state)=>{return state.pronCorrect})
  // const pronWrong = useSelector((state)=>{return state.pronWrong})
  // const dispatch = useDispatch()

  return(
    <div>
      {/* <button onClick={() => dispatch(changeCorrect(true))}>맞음</button>
      <button onClick={() => dispatch(changeWrong(true))}>틀림</button>
      {pronCorrect && <Confetti />}
      {pronCorrect && <CelebratePron />}
      {pronWrong && <WrongConfetti/>}
      {pronWrong && <RetryPron/>} */}

      <div>  
        <Entry type={"음절"} />
      </div>
    </div>
  )
}

export default Syllable