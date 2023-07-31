import { useState } from "react";
import Confetti from "./Confetti"
import CelebratePron from "./CelebratePron";

function Syllable() {
  const [isVisible, setIsVisible] = useState(false);
  return(
    <div>
      <p>음절발음하기</p>
      <button onClick={() => setIsVisible(!isVisible)}>Fire</button>
      {isVisible && <Confetti />}
      {isVisible && <CelebratePron />}
    </div>
  )
}

export default Syllable