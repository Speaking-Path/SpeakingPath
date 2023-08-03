package com.twinlions.spkpath.user.service;

import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.jwt.TokenDto;
import com.twinlions.spkpath.user.UserDto;
import com.twinlions.spkpath.user.entity.User;

import java.util.Optional;

public interface UserService {
    String join(UserDto userDto);
    int csltJoin(ConsultantDto csltDto);
    int login(UserDto userDto);
    int checkId(String userId);
    int checkEmail(String userEmail);
    User update(UserDto userDto);

    TokenDto login(String userId, String pwd);

    Optional<?> mypage(String userId);

    String uploadProfile(String userId, String saveFileName);
}
