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
    </div>
  )
}

export default Word