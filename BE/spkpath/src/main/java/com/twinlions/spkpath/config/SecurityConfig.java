package com.twinlions.spkpath.config;

import com.twinlions.spkpath.jwt.JwtAuthenticationFilter;
import com.twinlions.spkpath.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate stringRedisTemplate;
    private final String[] accountPermitList = new String[] {"/account/login", "/account/signup", "/account/logout",
            "/account/checkid", "/account/checkemail", "/account/consultantsignup",
            "/account/find/**", "/account/auth/**", "/account/naverlogin", "/account/naver-login", "/account/getuserinfobytoken"};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // sessiond 을 쓰지 않는다는 말
                .and()
                .authorizeRequests()
                .antMatchers("/v3/api-docs","/swagger*/**").permitAll() // swagger 관련 permit all
                .antMatchers(accountPermitList).permitAll()
                .antMatchers("/","/static/**","/assets/**").permitAll()
                .antMatchers("/favicon.ico").permitAll()
                .antMatchers("account/mypage").hasAnyAuthority()
                .antMatchers("account/chnage").hasAnyAuthority()
                .antMatchers("/practice/**").permitAll()
                .antMatchers("/cslting/**").permitAll()
                .antMatchers("/cslt/**").permitAll()
                .antMatchers("/stt/**").permitAll()
                .antMatchers("/manifest.json").permitAll()
                .anyRequest().authenticated() // 이 밖의 모든 요청에 대해 인증을 필요로 한다는 설정

                .and() // filter 설정하여
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, stringRedisTemplate), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
