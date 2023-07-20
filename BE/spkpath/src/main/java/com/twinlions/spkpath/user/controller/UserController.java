package com.twinlions.spkpath.user.controller;

import com.twinlions.spkpath.user.UserDto;
import com.twinlions.spkpath.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor // 생성자 사용하지 않기 위해
@RequestMapping("/account")
@Tag(name = "회원", description = "회원 관련 API 입니다.")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    // Todo: JWT 구현해야함
    // private JwtService jwtService;

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
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
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
        int result = userService.login(userDto);
        if( result == -1){
            return new ResponseEntity<>("아이디가 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        }else if(result == 0){
            return new ResponseEntity<>("비밀번호가 일치하지 않습니다.", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>("로그인 성공하였습니다.", HttpStatus.OK);
        }
    }

}
