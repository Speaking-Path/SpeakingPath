package com.twinlions.spkpath.user.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.twinlions.spkpath.jwt.JwtTokenProvider;
import com.twinlions.spkpath.user.UserDto;
import com.twinlions.spkpath.user.entity.User;
import com.twinlions.spkpath.user.repository.CustomUserDetailsService;
import com.twinlions.spkpath.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import springfox.documentation.spring.web.json.Json;

import java.net.URLEncoder;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService {
    private final UserRepository userRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String NAVER_CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String NAVER_CLIENT_SECRET;
    @Value("${spring.security.oauth2.client.registration.naver.redirect-uri}")
    private String NAVER_REDIRECT_URI;
    @Value("${spring.security.oauth2.client.provider.naver.user-info-uri}")
    private String NAVER_USER_INFO_URI;

    private String TYPE;
    private String CLIENT_ID;
    private String REDIRECT_URI;

    public UserDto signup(String code, String type){
        TYPE = type;
        CLIENT_ID  = NAVER_CLIENT_ID;
        REDIRECT_URI = NAVER_REDIRECT_URI;

        String accessToken = getAccessToken(code).get("access_token").asText();
        // 토큰으로 카카오 API 호출 (이메일 정보 가져오기)

        String email = getUserInfo(accessToken).get("email").asText();
        String id = getUserInfo(accessToken).get("id").asText();
        String sex = getUserInfo(accessToken).get("gender").asText();
        String mobile = getUserInfo(accessToken).get("mobile").asText();
        String name = getUserInfo(accessToken).get("name").asText();

        // DB정보 확인 -> 없으면 DB에 저장
        User user = registerUserIfNeed(id, email, sex, mobile, name);

        // JWT 토큰 리턴 & 로그인 처리
        String jwtToken = "Bearer "+usersAuthorizationInput(user);

        // 회원여부 이메일으로 확인
        Boolean isMember = checkIsMember(user);

        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserEmail());
        userDto.setUserEmail(user.getUserEmail());
        userDto.setUserPhone(user.getUserPhone());
        userDto.setUserName(user.getUserName());
        userDto.setUserSex(user.getUserSex());
        userDto.setUserGrade("USER");
        userDto.setUserPwd(jwtToken);

        return userDto;
    }

    public UserDto signin(String accessToken, String type){
        TYPE = type;
        CLIENT_ID  = NAVER_CLIENT_ID;
        REDIRECT_URI = NAVER_REDIRECT_URI;

        // 토큰으로 카카오 API 호출 (이메일 정보 가져오기)
        JsonNode jsonNode = getUserInfo(accessToken);
        String email = jsonNode.get("email").asText();
        String id = jsonNode.get("id").asText();
        String sex = jsonNode.get("gender").asText();
        String mobile = jsonNode.get("mobile").asText();
        String name = jsonNode.get("name").asText();

        // DB정보 확인 -> 없으면 DB에 저장
        User user = registerUserIfNeed(id, email, sex, mobile, name);

        // JWT 토큰 리턴 & 로그인 처리
        String jwtToken = "Bearer "+usersAuthorizationInput(user);

        // 회원여부 이메일으로 확인
        Boolean isMember = checkIsMember(user);

        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setUserEmail(user.getUserEmail());
        userDto.setUserPhone(user.getUserPhone());
        userDto.setUserName(user.getUserName());
        userDto.setUserSex(user.getUserSex());
        userDto.setUserGrade("USER");
        userDto.setUserPwd(jwtToken);

        return userDto;
    }

    private JsonNode getAccessToken(String code){
        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-type", "application/x-www-form-unlencoded;charset=utf-8");
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", CLIENT_ID);
        body.add("client_secret", NAVER_CLIENT_SECRET);
        body.add("redirect_uri", REDIRECT_URI);
        body.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response;

        response = rt.exchange(
                "https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                request,
                String.class
        );
        String responseBody = response.getBody();
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
//            System.out.println(jsonNode);
            return jsonNode;
        } catch (Exception e) {
//            System.out.println("in exception");
            return null;
        }
    }

    private JsonNode getUserInfo(String accessToken) {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기 - Post 방식
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response;

//        if(TYPE == "kakao") {
//            response = rt.exchange(
//                    "https://kapi.kakao.com/v2/user/me",
//                    HttpMethod.POST,
//                    request,
//                    String.class
//            );
//        } else {
            response = rt.exchange(
                    "https://openapi.naver.com/v1/nid/me",
                    HttpMethod.POST,
                    request,
                    String.class
            );


        // responseBody 정보 꺼내기
        String responseBody = response.getBody();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            if(TYPE == "kakao") {
                return jsonNode.get("kakao_account");
            } else {
//                System.out.println(jsonNode.get("response"));
                return jsonNode.get("response");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // DB정보 확인 -> 없으면 DB에 저장
    private User registerUserIfNeed(String id, String email, String sex, String mobile, String name) {
        // DB에 중복된 이메일 있는지 확인
        Optional<User> user = userRepository.findByUserId(id);

        if (user.isEmpty()) {
            // DB에 정보 등록
            User newUser = User.builder()
                    .userId(id)
                    .userPhone(mobile)
                    .userName(name)
                    .userSex(sex)
                    .userGrade("USER")
                    .userEmail(email)
                    .userPwd(passwordEncoder.encode(id))
                    .build();
            userRepository.save(newUser);
        }

        return (User)userRepository.findByUserEmail(email).get();
    }

    private String usersAuthorizationInput(User user) {

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUserId());
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                "",
                userDetails.getAuthorities()
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtTokenProvider.generateToken(authentication, user.getUserId()).getAccessToken();
        String refreshToken = jwtTokenProvider.generateToken(authentication, user.getUserId()).getRefreshToken();

        userRepository.save(user);
        return accessToken+" "+refreshToken;
    }

    private Boolean checkIsMember(User user) {
        return user.getUserEmail() != null;
    }

    public String getNaverAuthorizeUrl(String type) throws  Exception{
        UriComponents uriComponents = UriComponentsBuilder
                .fromUriString("https://nid.naver.com/oauth2.0/"+type)
                .queryParam("response_type", "code")
                .queryParam("client_id", NAVER_CLIENT_ID)
                .queryParam("redirect_uri", URLEncoder.encode(NAVER_REDIRECT_URI, "UTF-8"))
                .queryParam("state", URLEncoder.encode("1234", "UTF-8"))
                .build();
        return uriComponents.toString();
    }

}
