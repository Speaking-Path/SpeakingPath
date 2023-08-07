package com.twinlions.spkpath.user.service;

import com.twinlions.spkpath.config.RandomStringCreator;
import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.consultant.entity.*;
import com.twinlions.spkpath.consultant.repository.*;
import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consultant.repository.ConsultantRepository;
import com.twinlions.spkpath.consultant.service.ConsultantService;
import com.twinlions.spkpath.jwt.JwtTokenProvider;
import com.twinlions.spkpath.jwt.TokenDto;
import com.twinlions.spkpath.mail.MailDto;
import com.twinlions.spkpath.user.entity.Authority;
import com.twinlions.spkpath.user.entity.User;
import com.twinlions.spkpath.user.repository.UserRepository;
import com.twinlions.spkpath.user.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.mail.javamail.JavaMailSender;

import javax.swing.text.html.Option;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor // UserRepository의 생성자를 쓰지 않기 위해
public class UserServiceImpl implements UserService{
    private Map<String, Integer> authInfo = new HashMap<>();
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final ConsultantTagRepository consultantTagRepository;
    private final TagRepository tagRepository;
    private final ConsultantBoundaryRepository consultantBoundaryRepository;
    private final BoundaryRepository boundaryRepository;
    private final ConsultantService consultantService;

    @Value("${spring.mail.username}")
    private String fromAddress;

    /**
     * 회원가입 메서드
     * @param userDto 회원가입할 사용자 정보 입력받음
     * @return userId
     */
    @Transactional
    @Override
    public String join(UserDto userDto) {
        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        User user = User.builder()
                .userId(userDto.getUserId())
                .userName(userDto.getUserName())
                .userPwd(passwordEncoder.encode(userDto.getUserPwd()))
                .userSex(userDto.getUserSex())
                .userAge(userDto.getUserAge())
                .userEmail(userDto.getUserEmail())
                .userGrade("USER")
                .userInfo(userDto.getUserInfo())
                .userPhone(userDto.getUserPhone())
                .userPic(userDto.getUserPic())
                .userReward(userDto.getUserReward())
                .activated(true) // 활성화 : 탈퇴 시 비활성화
                .authorities(Collections.singleton(authority)) // 싱글톤으로 authority 추가
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
    @Transactional
    @Override
    public int csltJoin(ConsultantDto consultantDto) {
        //TODO: 두번 실행하지 않고 한번만 실행하는 방법으로 수정해보기

        // 1. 태그, 바운더리 제외한 나머지 속성을 consultant에 추가
        // 2. 태그, 바운더리 추가
        try{
            Consultant consultant = Consultant.builder()
                    .userId(consultantDto.getUserId())
                    .userEmail(consultantDto.getUserEmail())
                    .userAge(consultantDto.getUserAge())
                    .userGrade(consultantDto.getUserGrade())
                    .userName(consultantDto.getUserName())
                    .userPhone(consultantDto.getUserPhone())
                    .userPwd(passwordEncoder.encode(consultantDto.getUserPwd()))
                    .userSex(consultantDto.getUserSex())
                    .csltExp(consultantDto.getCsltExp())
                    .csltTeam(consultantDto.getCsltTeam())
                    .build();
            consultantRepository.save(consultant);

            // consultantTag에 저장
            List<Tag> tags = new ArrayList<>();
            for (String tagName: consultantDto.getCsltTag()) {
                Tag tag = tagRepository.findByTagName(tagName).orElse(null);
                ConsultantTag consultantTag = ConsultantTag.builder()
                        .cslt(consultant)
                        .tag(tag)
                        .build();
                consultantTagRepository.save(consultantTag);
            }

            // consultantBoundary에 저장
            for (String boundaryName: consultantDto.getCsltBoundary()) {
                Boundary boundary = boundaryRepository.findByBoundaryName(boundaryName).orElse(null);
                ConsultantBoundary consultantBoundary = ConsultantBoundary.builder()
                        .cslt(consultant)
                        .boundary(boundary)
                        .build();
                consultantBoundaryRepository.save(consultantBoundary);
            }

            return 1;
        } catch (Exception e){
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
        if(userRepository.findByUserId(userDto.getUserId()).isPresent()){
            user = (User)userRepository.findByUserId(userDto.getUserId()).get();
            if(passwordEncoder.matches(user.getUserPwd(), userDto.getUserPwd())){ // id와 pwd가 일치한다면
                return 1; // login 성공
            }
            return 0; // 비밀번호 오류
        }else{ // 아이디 존재하지 않으면
            return -1; // -1 return
        }
    }

    @Override
    public int checkId(String userId){
        if(!userRepository.findByUserId(userId).isPresent()){ // 아이디가 존재하지 않으면
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

    /**
     * 수정할 userDto를 받아 pwd, info, phone 정보를 변경한다.
     * @param userDto // 수정할 정보를 담은  userDto를 받는다
     * @return User
     */
    @Transactional
    @Override
    public User update(UserDto userDto) {
        Optional<User> updateUser = userRepository.findByUserId(userDto.getUserId());
        updateUser.ifPresent(selectUser ->{
            if(userDto.getUserPwd()!=null) selectUser.setUserPwd(passwordEncoder.encode(userDto.getUserPwd()));
            if(userDto.getUserInfo()!=null) selectUser.setUserInfo(userDto.getUserInfo());
            if(userDto.getUserPhone()!=null) selectUser.setUserPhone(userDto.getUserPhone());
            userRepository.save(selectUser);
        });
        return updateUser.get();
    }

    @Override
    public TokenDto login(String userId, String pwd){
        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, pwd);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = jwtTokenProvider.generateToken(authentication, userId);

        return tokenDto;
    }

    @Override
    public Optional<?> mypage(String userId) {
        Consultant consultant = consultantRepository.findByUserId(userId);
        if (consultant == null) {
            return userRepository.findByUserId(userId);
        }
        ConsultantDto consultantDto = consultantService.convertToDto(consultant);
        return Optional.of(consultantDto);
    }

    @Transactional
    @Override
    public void uploadProfile(String userId, String saveFileName) {
        User user = userRepository.findByUserId(userId).get();
        user.setUserPic(saveFileName);
        userRepository.save(user);
    }

    @Override
    public String findUserIdByUserNameAndUserEmail(String userName, String userEmail) {
        Optional<User> user = userRepository.findByUserNameAndUserEmail(userName, userEmail);
        if(user.isPresent()) return userRepository.findByUserNameAndUserEmail(userName, userEmail).get().getUserId();
        return "fail";
    }

    @Override
    public MailDto createEmailAndChangePwd(String userId, String userEmail) {
        String tempPassword = new RandomStringCreator().getTempPassword();
        MailDto mailDto = new MailDto();
        mailDto.setAddress(userEmail);
        mailDto.setTitle("말하길 임시 비밀번호 안내 이메일입니다.");
        mailDto.setMessage("안녕하세요. 말하길입니다!\n임시 비밀번호 안내 이메일입니다.\n회원님의 임시 비밀번호는 "
                + tempPassword + " 입니다.\n로그인 후에 비밀번호를 변경해 주세요.");

        Optional<User> updateUser = userRepository.findByUserId(userId);
        updateUser.ifPresent(selectUser -> {
            selectUser.setUserPwd(passwordEncoder.encode(tempPassword));
            userRepository.save(selectUser);
        });
        return mailDto;
    }

    @Override
    public MailDto authUserEmail(String userEmail) {
        Random random = new Random();		//랜덤 함수 선언
        int createNum = 0;  			//1자리 난수
        String ranNum = ""; 			//1자리 난수 형변환 변수
        int letter    = 6;			//난수 자릿수:6
        String resultNum = "";  		//결과 난수

        for (int i=0; i<letter; i++) {
            createNum = random.nextInt(9);		//0부터 9까지 올 수 있는 1자리 난수 생성
            ranNum =  Integer.toString(createNum);  //1자리 난수를 String으로 형변환
            resultNum += ranNum;			//생성된 난수(문자열)을 원하는 수(letter)만큼 더하며 나열
        }
        authInfo.put(userEmail, Integer.parseInt(resultNum));

        MailDto mailDto = new MailDto();
        mailDto.setAddress(userEmail);
        mailDto.setTitle("말하길 회원가입 인증 메일입니다.");
        mailDto.setMessage("안녕하세요. 말하길입니다.\n이메일 인증번호 안내 관련 이메일입니다.\n회원님의 인증번호는 "
                + resultNum + " 입니다.\n회원가입 페이지에서 해당 번호를 입력해주세요! :)");

        return mailDto;
    }

    @Override
    public boolean checkAuthNumber(String userEmail, int number){
        if(authInfo.get(userEmail) == number) return true;
        return false;
    }

    @Override
    public void sendEmail(MailDto mailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDto.getAddress());
        message.setFrom(fromAddress);
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getMessage());
        log.info("message:" + message);
        mailSender.send(message);
    }
}