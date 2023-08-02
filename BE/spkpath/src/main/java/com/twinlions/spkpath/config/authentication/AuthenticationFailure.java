package com.twinlions.spkpath.config.authentication;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationFailure implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String errorMessage = null;
        if(exception instanceof BadCredentialsException || exception instanceof InternalAuthenticationServiceException){
            errorMessage = "아이디나 비밀번호 오류입니다. 다시 확인해주세요";
        }else if(exception instanceof DisabledException){
            errorMessage = "계정이 비활성화 되었습니다. 관리자에게 문의하세요";
        }else if(exception instanceof CredentialsExpiredException){
            errorMessage = "비밀번호 유효기간이 만료되었습니다. 관리자에게 문의하세요";
        }else{
            errorMessage = "알 수 없는 오류로 로그인에 실패하였습니다. 관리자에게 문의하세요";
        }
        request.setAttribute("errorMessage", errorMessage);
        request.getRequestDispatcher("/account/login?error=true").forward(request, response);
    }
}
