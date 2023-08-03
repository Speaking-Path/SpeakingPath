import { useSelector } from 'react-redux';


function Profile() {
  const userInfo = useSelector((state)=>{return state.profileInfo})

  console.log(userInfo)

  return(
    <div>
      <p>내 프로필</p>
    </div>
  )
}

export default Profile