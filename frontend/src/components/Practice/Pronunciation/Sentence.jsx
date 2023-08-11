import Entry from "./Entry"


function Sentence() {
  const speakImage = '../../assets/speak3.jpg';

  return(
    <div>
      <div>  
        <Entry type={"문장"} speakImage={speakImage} />
      </div>
    </div>

  )
}

export default Sentence