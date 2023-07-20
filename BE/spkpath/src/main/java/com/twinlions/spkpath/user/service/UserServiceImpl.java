package com.twinlions.spkpath.user.service;

import com.twinlions.spkpath.user.entity.User;
import com.twinlions.spkpath.user.repository.UserRepository;
import com.twinlions.spkpath.user.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // UserRepository의 생성자를 쓰지 않기 위해
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    /**
     * 회원가입 메서드
     * @param userDto 회원가입할 사용자 정보 입력받음
     * @return userId
     */
    @Override
    public String join(UserDto userDto) {
        User user = User.builder()
                .userId(userDto.getUserId())
                .userName(userDto.getUserName())
                .userPwd(userDto.getUserPwd())
                .userSex(userDto.getUserSex())
                .userAge(userDto.getUserAge())
                .userEmail(userDto.getUserEmail())
                .userGrade(userDto.getUserGrade())
                .userInfo(userDto.getUserInfo())
                .userPhone(userDto.getUserPhone())
                .userPic(userDto.getUserPic())
                .userReward(userDto.getUserReward())
                .build();
        return userRepository.save(user).getUserId();
    }

    /**
     * 로그인 메서드
     * @param userDto 로그인할 정보 입력받음
     * @return int (아이디 없을 경우 -1, 비밀번호 틀릴경우 0, 성공시 1 return)
     */
    @Override
    public int login(UserDto userDto) {
        User user = null;
        //  만약 아이디 존재하면
        if(userRepository.findById(userDto.getUserId()).isPresent()){
            user = userRepository.findById(userDto.getUserId()).get();
            if(user.getUserPwd().equals(userDto.getUserPwd())){ // id와 pwd가 일치한다면
                return 1; // login 성공
            }
            return 0; // 비밀번호 오류
        }else{ // 아이디 존재하지 않으면
            return -1; // -1 return
        }

    }
}
