package com.twinlions.spkpath.user.service;

import java.util.Date;

import io.jsonwebtoken.*;

// main 함수가 있는 클래스
public class JwtServiceImpl implements JwtService {
    // 암호화하기 위한 키
    private static String SECRET_KEY = "secret";
    // JWT 만료 시간 1시간
    private static long tokenValidMilisecond = 1000L * 60 * 60;
    // 실행 함수
//    public static void main() {
//        // Program 인스턴스 생성
//        var p = new JwtServiceImpl();
//        // JWT 토큰 생성 - id는 nowonbun
//        var token = p.createToken("nowonbun");
//        // 콘솔 출력
//        System.out.println(token);
//        // JWT 토큰 복호화
//        var claims = p.getClaims(token);
//        // JWT 토큰 검증
//        if (claims != null && p.validateToken(claims)) {
//            // id를 취득한다.
//            var id = p.getKey(claims);
//            // Payload 값의 test 키의 값을 취득
//            var test = p.getClaims(claims, "test");
//            // 콘솔 출력
//            System.out.println(id);
//            System.out.println(test);
//        } else {
//            // 토큰이 정합성이 맞지 않으면
//            System.out.println("error");
//        }
//    }
    // 토큰 생성 함수
    public String createToken(String key) {
        // Claims을 생성
        var claims = Jwts.claims().setId(key);
        // Payload 데이터 추가
        claims.put("test", "Hello world");
        // 현재 시간
        Date now = new Date();
        // JWT 토큰을 만드는데, Payload 정보와 생성시간, 만료시간, 알고리즘 종류와 암호화 키를 넣어 암호화 함.
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidMilisecond))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
    // String으로 된 코드를 복호화한다.
    public Jws<Claims> getClaims(String jwt) {
        try {
            // 암호화 키로 복호화한다.
            // 즉 암호화 키가 다르면 에러가 발생한다.
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(jwt);
        }catch(SignatureException e) {
            return null;
        }
    }
    // 토큰 검증 함수
    public boolean validateToken(Jws<Claims> claims) {
        // 토큰 만료 시간이 현재 시간을 지났는지 검증
        return !claims.getBody()
                .getExpiration()
                .before(new Date());
    }
    // 토큰을 통해 Payload의 ID를 취득
    public String getKey(Jws<Claims> claims) {
        // Id 취득
        return claims.getBody()
                .getId();
    }
    // 토큰을 통해 Payload의 데이터를 취득
    public Object getClaims(Jws<Claims> claims, String key) {
        // 데이터 취득
        return claims.getBody()
                .get(key);
    }
}
