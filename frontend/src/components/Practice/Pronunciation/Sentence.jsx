import Entry from "./Entry"
import SelectTest from "./SelectTest"

function Sentence() {
  return(
    <div>
      {/* <h3>문장 발음</h3>
      <h3>훈련 방법 설명</h3> */}
      <div>  
        {/* <SelectTest /> */}
        <Entry type={"문장"} />
      </div>
        <div>
        </div>     
    </div>

  )
}

export default Sentence