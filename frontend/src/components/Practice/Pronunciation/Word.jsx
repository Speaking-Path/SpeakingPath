import { useState } from "react";
import Preview from './Preview';


function Word() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPreviewOpen(true);
  };

  return(
    <div>
      
      <h3>단어 발음</h3>

      <h3>훈련 방법 설명</h3>

      <div>
        <button type="button" className="btn btn-outline-primary ms-1" onClick={handleButtonClick}>시작하기</button>
      </div>

    </div>
  )
}

export default Word