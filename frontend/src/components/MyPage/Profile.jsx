import { useSelector } from 'react-redux';


function Profile() {
  const userInfo = useSelector((state) => { return state.profileInfo })
  console.log(userInfo)

  return (
    <div>
      <div>
        <p>내 정보</p>
        <p>내 정보 수정</p>
      </div>
      <div>
        <p>현재 리워드</p>
        <div>
          <p>{userInfo.userReward}</p>
        </div>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  )
}

export default Profile