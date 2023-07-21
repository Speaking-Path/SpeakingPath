import { useNavigate } from "react-router-dom"
function Consulting(){
    const navigate = useNavigate();
    const goToMeeting = () => {
        navigate("meeting");
    };
    return (
        <div className="container">
           <button type="button" className="btn btn-outline-primary ms-1" onClick={goToMeeting}>치료하기</button>
        </div>
    )
}
export default Consulting