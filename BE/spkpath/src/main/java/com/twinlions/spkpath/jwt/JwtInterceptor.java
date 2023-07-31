package com.twinlions.spkpath.jwt;

import com.twinlions.spkpath.exception.UnAuthorizedException;
import com.twinlions.spkpath.jwt.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

@Component
public class JwtInterceptor implements HandlerInterceptor {
    private static final String HEADER_AUTH = "X-ACCESS-TOKEN";

    private JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println(request.getMethod());
        if(request.getMethod().equals("OPTIONS"))return true;
        Enumeration<String> headers = request.getHeaders(HEADER_AUTH);
        String value = null;
        while(headers.hasMoreElements()) {
            value = headers.nextElement();
        }
        System.out.println("value: " + value);

        String token = request.getHeader(HEADER_AUTH);
        System.out.println("token: " + token);
        if(token != null) {
            token = token.split(" ")[1];
            System.out.println("modify token: " + token);
            if(jwtTokenProvider.validateToken(token)) {
                return true;
            }
            else {
                throw new UnAuthorizedException();
            }
        } else {
            throw new UnAuthorizedException();
        }
    }
}
