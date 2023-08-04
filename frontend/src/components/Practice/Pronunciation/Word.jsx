import { useState } from "react";
import Entry from "./Entry";

function Word() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPreviewOpen(true);
  };

  return(
    <div>
      
      <div>  
        <Entry type={"단어"} />
      </div>

      <div>
        <button type="button" className="btn btn-outline-primary ms-1" onClick={handleButtonClick}>시작하기</button>
      </div>

    </div>
  )
}

export default Word