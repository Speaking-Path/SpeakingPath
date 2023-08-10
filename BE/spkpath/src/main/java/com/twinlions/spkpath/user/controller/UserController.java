package com.twinlions.spkpath.user.controller;

import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.jwt.JwtAuthenticationFilter;
import com.twinlions.spkpath.jwt.JwtTokenProvider;
import com.twinlions.spkpath.jwt.TokenDto;
import com.twinlions.spkpath.mail.MailDto;
import com.twinlions.spkpath.user.UserDto;
import com.twinlions.spkpath.user.repository.CustomUserDetailsService;
import com.twinlions.spkpath.user.repository.UserRepository;
import com.twinlions.spkpath.user.service.UserService;
import com.twinlions.spkpath.user.vo.NameAndEmailVO;
import com.twinlions.spkpath.user.vo.UserVO;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor // 생성자 사용하지 않기 위해
@RequestMapping("/account")
@Api(value = "회원", description = "회원 관련 API 입니다.")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final CustomUserDetailsService customUserDetailsService;
    @Value("${file.path.profilePath}")
    private String profilePath;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping(value = "/signup")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "회원가입", description = "회원가입을 위한 정보를 입력한다.")
    public ResponseEntity<?> signup(@RequestBody UserDto userDto){
        // TODO : logger 안찍히는 issue -> 해결해야해
//        logger.debug("회원가입요청: {}", userDto.toString()); // 지금 로거 출력 안되는 이슈
        String result = userService.join(userDto);
        // TODO : 회원가입 실패시 예외처리 어떻게 할지 정해야해!
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping(value = "/consultantsignup")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "상담사 회원가입", description = "상담사 회원가입을 위한 정보를 입력한다.")
    public ResponseEntity<?> csltSignup(@RequestBody ConsultantDto consultantDto){
        // TODO : logger 안찍히는 issue -> 해결해야해
//        logger.debug("회원가입요청: {}", userDto.toString()); // 지금 로거 출력 안되는 이슈
        int result = userService.csltJoin(consultantDto);
        if(result == 1){
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else{
            return new ResponseEntity<>("fail", HttpStatus.OK);
        }
    }

    @PostMapping(value = "/login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "로그인", description = "로그인을 위한 정보를 입력한다.")
    public ResponseEntity<?> login(@RequestBody UserDto userDto){
        TokenDto tokenDto = userService.login(userDto.getUserId(), userDto.getUserPwd());
        return new ResponseEntity<>(tokenDto, HttpStatus.OK);
    }

    @PostMapping(value = "/logout")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "400", description = "bad request operation"),
            @ApiResponse(responseCode = "500", description = "SQL Exception")
    })
    @Operation(summary = "로그아웃", description = "로그아웃을 한다. 토큰을 삭제한다.")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String tokenWithPrefix){
        log.info("logout 요청");
        try{
            String token = tokenWithPrefix.substring(7);
            TokenDto tokenDto = new TokenDto();
            tokenDto.setAccessToken(token);
            tokenDto.setGrantType("Bearer");
            System.out.println(token);
            userService.logout(tokenDto);
            log.info("logout 성공");
            return new ResponseEntity<>("success", HttpStatus.OK);
        }catch (Exception e){
            log.info("logout 실패");
            return new ResponseEntity<>("fail", HttpStatus.OK);
        }
    }

    @GetMapping(value = "/checkid")
    @Operation(summary = "아이디 중복 체크", description = "아이디가 존재하는 아이디인지 확인한다. \n 확인하고자 하는 아이디를 입력한다.")
    public ResponseEntity<String> checkId(@RequestParam String userId){
        int result = userService.checkId(userId);
        if( result == 1){
            return new ResponseEntity<>("success", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("fail", HttpStatus.OK);
        }
    }

    @GetMapping(value = "/checkemail")
    @Operation(summary = "이메일 중복 체크", description = "이메일이 존재하는 이메일인지 확인한다. \n 확인하고자 하는 이메일를 입력한다.")
    public ResponseEntity<String> checkEmail(@RequestParam String userEmail){
        int result = userService.checkEmail(userEmail);
        if( result == 1){
            return new ResponseEntity<>("success", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("fail", HttpStatus.OK);
        }
    }

    @PostMapping(value = "/mypage")
    @Operation(summary = "내 프로필 조회", description = "내 프로필을 조회한다.")
    public ResponseEntity<?> readProfile(@RequestBody UserVO userId, ServletRequest request){
        String token = jwtAuthenticationFilter.resolveToken((HttpServletRequest) request);
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        if(userId.getUserId().equals(authentication.getName())){
            Optional<?> user = userService.mypage(userId.getUserId());
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }

    /**
     * 수정할 정보를 userDto 에 담아 보내주면 수정한다.
     * 현재는 pwd, info, phone 정보만 수정 가능하다.
     * @param userDto
     * @return
     */
    @PutMapping(value = "/change")
    @Operation(summary = "내 프로필 정보 수정", description = "내 프로필의 정보를 수정할 수 있습니다.")
    public ResponseEntity<?> changeProfile(@RequestBody UserDto userDto, ServletRequest request){
        String token = jwtAuthenticationFilter.resolveToken((HttpServletRequest) request);
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        if(userDto.getUserId().equals(authentication.getName())){
            return new ResponseEntity<>(userService.update(userDto), HttpStatus.OK);
        }
        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping(value = "/profile")
    @Operation(summary = "프로필 사진 업로드", description = "내 프로필 사진을 업로드한다.")
    public ResponseEntity<?> uploadProfile(
            @RequestParam("userId") String userId, @RequestParam("file")MultipartFile file){
        if(!file.isEmpty()) {
            LocalDate now = LocalDate.now();
            String saveFolder = profilePath + "/" + userId + "/" + now;
            File folder = new File(saveFolder);
            if (!folder.exists())
                folder.mkdirs();

            String originalFileName = file.getOriginalFilename();

            if (!originalFileName.isEmpty()) {
                String saveFileName = UUID.randomUUID().toString()
                        + originalFileName.substring(originalFileName.lastIndexOf('.'));
                try {
                    file.transferTo(new File(folder, saveFileName));
                    userService.uploadProfile(userId, userId + "/" + now + "/" + saveFileName);
                    log.info("UserController:: upload profile {} at {}", userId, saveFolder);
                    return new ResponseEntity<String>(userId + "/" + now + "/"+ saveFileName, HttpStatus.CREATED);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
                }
            }
        }
        return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/find/id")
    @Operation(summary = "아이디 찾기", description = "이름과 이메일을 입력하면 아이디를 찾아준다.")
    public ResponseEntity<?> findUserId(@RequestBody NameAndEmailVO nameAndEmailVO){
        log.debug("아이디 찾기 요청 : " + nameAndEmailVO.getUserEmail());
        return new ResponseEntity<>(
                userService.findUserIdByUserNameAndUserEmail(nameAndEmailVO.getUserName(), nameAndEmailVO.getUserEmail()),
                HttpStatus.OK);
    }

    @PostMapping(value = "/find/pwd")
    @Operation(summary = "비밀번호 찾기", description = "이름과 이메일을 입력하면 임시비밀번호를 발급해준다.")
    public ResponseEntity<?> findUserPwd(@RequestBody NameAndEmailVO nameAndEmailVO){
        String userId = userService.findUserIdByUserNameAndUserEmail(nameAndEmailVO.getUserName(), nameAndEmailVO.getUserEmail());
        if(userId.equals("fail")){ // 일치하는 이름과 이메일이 없으면 fail을 return 한다
            return new ResponseEntity<>("fail", HttpStatus.OK);
        }
        userService.sendEmail(userService.createEmailAndChangePwd(userId, nameAndEmailVO.getUserEmail()));
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @PostMapping("/auth/sendEmail")
    @Operation(summary = "회원가입 시 입력된 이메일로 인증번호를 전송한다.", description = "이메일 가입을 위한 이메일 인증")
    public ResponseEntity<?> sendEmailAuthCheck(@RequestBody NameAndEmailVO nameAndEmailVO)  {
        log.debug("sendEmailAuthCheck sending email to : {}", nameAndEmailVO.getUserEmail());

        MailDto mail = userService.authUserEmail(nameAndEmailVO.getUserEmail());
        userService.sendEmail(mail);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @PostMapping("/auth/checkEmail/{number}")
    @Operation(summary = "회원가입 시 입력된 이메일로 전송된 인증번호를 검증한다.", description = "이메일 가입을 위한 이메일 인증번호 확인")
    public ResponseEntity<?>  emailAuthCheck(@RequestBody NameAndEmailVO nameAndEmailVO, @PathVariable("number") int number) {
        log.debug("emailAuthCheck 해당 메일로 보낸 인증번호 확인: ", nameAndEmailVO.getUserEmail());
        return new ResponseEntity<>(userService.checkAuthNumber(nameAndEmailVO.getUserEmail(), number), HttpStatus.OK);
    }

    @PostMapping("/auth/checkToken")
    @Operation(summary = "토큰 유효성 검사", description = "토큰을 입력받으면 유효한 사용자인지, 만료된 토큰인지 등 유효성 검사를 시행한다.")
    public ResponseEntity<?>  checkToken(@RequestBody TokenDto token){
        try {
            return new ResponseEntity<>(jwtTokenProvider.validateToken(token.getAccessToken()), HttpStatus.ACCEPTED);
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (ExpiredJwtException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (UnsupportedJwtException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}