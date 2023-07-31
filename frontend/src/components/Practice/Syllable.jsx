import { useState } from "react";
import Confetti from "./Confetti"
import Celebrate from "./Celebrate";

function Syllable() {
  const [isVisible, setIsVisible] = useState(false);
  return(
    <div>
      <p>음절발음하기</p>
      <button onClick={() => setIsVisible(!isVisible)}>Fire</button>
      {isVisible && <Confetti />}
      {isVisible && <Celebrate />}
    </div>
  )
}

export default Syllable