import axios from "axios";
import { useSelector } from "react-redux";

function CheckAnswer() {
  const userId = useSelector((state) => state.loginId);

  const correctAnswer = function () {
    axios
      .post("/practice/correct", { userId: userId })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const wrongAnswer = function () {
    axios
      .post("/practice/wrong", { userId: userId })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return null; // 렌더링할 내용이 없으므로 null 반환
}

export default CheckAnswer;
