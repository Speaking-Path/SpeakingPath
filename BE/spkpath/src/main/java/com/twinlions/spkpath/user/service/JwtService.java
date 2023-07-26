package com.twinlions.spkpath.user.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

public interface JwtService {
    public String createToken(String key);

    public Jws<Claims> getClaims(String jwt);

    public boolean validateToken(Jws<Claims> claims);

    public String getKey(Jws<Claims> claims);

    public Object getClaims(Jws<Claims> claims, String key);
}
