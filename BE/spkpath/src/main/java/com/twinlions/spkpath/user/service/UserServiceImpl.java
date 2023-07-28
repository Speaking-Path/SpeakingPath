package com.twinlions.spkpath.user.service;

import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consultant.repository.ConsultantRepository;
import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consultant.repository.ConsultantRepository;
import com.twinlions.spkpath.user.entity.User;
import com.twinlions.spkpath.user.repository.UserRepository;
import com.twinlions.spkpath.user.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor // UserRepository의 생성자를 쓰지 않기 위해
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;

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
        try{
            userRepository.save(user);
            return "success";
        }catch(Exception e) {
            return "fail";
        }
    }

    /**
     * 상담사 회원가입 메서드
     * @param consultantDto 회원가입할 상담사 정보 입력받음
     * @return 성공 number
     */
    @Override
    public int csltJoin(ConsultantDto consultantDto) {
        //TODO: 두번 실행하지 않고 한번만 실행하는 방법으로 수정해보기
        try{
            Consultant consultant = Consultant.builder()
                    .userId(consultantDto.getUserId())
                    .userEmail(consultantDto.getUserEmail())
                    .userAge(consultantDto.getUserAge())
                    .userGrade(consultantDto.getUserGrade())
                    .userName(consultantDto.getUserName())
                    .userPhone(consultantDto.getUserPhone())
                    .userPwd(consultantDto.getUserPwd())
                    .userSex(consultantDto.getUserSex())
//                    .csltBoundary(consultantDto.getCsltBoundary())
                    .csltExp(consultantDto.getCsltExp())
//                    .csltTag(consultantDto.getCsltTag())
                    .csltTeam(consultantDto.getCsltTeam())
                    .build();
            consultantRepository.save(consultant);
            return 1;
        }catch (Exception e){
            return -1;
        }
    }

    /**
     * 로그인 메서드
     * @param userDto 로그인할 정보 입력받음
     * @return int (아이디 없을 경우 -1, 비밀번호 틀릴경우 0, 성공시 1 return)
     */
    @Override
    public int login(UserDto userDto) {
        User user;
        //  만약 아이디 존재하면
        if(userRepository.findById(userDto.getUserId()).isPresent()){
            user = (User)userRepository.findById(userDto.getUserId()).get();
            if(user.getUserPwd().equals(userDto.getUserPwd())){ // id와 pwd가 일치한다면
                return 1; // login 성공
            }
            return 0; // 비밀번호 오류
        }else{ // 아이디 존재하지 않으면
            return -1; // -1 return
        }
    }

    @Override
    public int checkId(String userId){
        if(!userRepository.findById(userId).isPresent()){ // 아이디가 존재하지 않으면
            return 1;
        }else{ // 아이디가 존재하지 않으면
            return -1;
        }
    }

    @Override
    public int checkEmail(String userEmail) {
        if(!userRepository.findByUserEmail(userEmail).isPresent()){ // 아이디가 존재하지 않으면
            return 1;
        }else{ // 아이디가 존재하지 않으면
            return -1;
        }
    }
}
