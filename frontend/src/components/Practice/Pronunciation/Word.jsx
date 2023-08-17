import { useState } from "react";
import Entry from "./Entry";

function Word() {
  const speakImage = '../../assets/pron/speak.jpg';

  return(
    <div>
      <div>  
        <Entry type={"단어"} speakImage={speakImage} />
      </div>
    </div>
  )
}

export default Word