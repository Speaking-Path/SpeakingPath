package com.twinlions.spkpath.jwt.service;

public interface JwtService {
    String createToken(String subject, long time);
    String getSubject(String token);
    boolean isUsable(String jwt);
}