import { useState } from "react";
import Confetti from "../Confetti"
import RetryRecog from "../RetryRecog"
import VoiceRecoding from "./VoiceRecording";

function PickName() {
  const [isVisible, setIsVisible] = useState(false);
  return(
    <div>
      <p>이름맞추기</p>
      <button onClick={() => setIsVisible(!isVisible)}>Fire</button>
      {isVisible && <Confetti />}
      {isVisible && <RetryRecog />}

      <div>
        <VoiceRecoding/>
      </div>
    </div>
  )
}

export default PickName