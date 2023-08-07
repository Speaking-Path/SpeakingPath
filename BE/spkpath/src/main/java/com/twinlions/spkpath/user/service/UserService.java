package com.twinlions.spkpath.user.service;

import com.twinlions.spkpath.consultant.ConsultantDto;
import com.twinlions.spkpath.jwt.TokenDto;
import com.twinlions.spkpath.mail.MailDto;
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
    void logout(TokenDto tokenDto);
    Optional<?> mypage(String userId);

    void uploadProfile(String userId, String saveFileName);

    String findUserIdByUserNameAndUserEmail(String userName, String userEmail);
    MailDto createEmailAndChangePwd(String userId, String userEmail);
    MailDto authUserEmail(String userEmail);
    boolean checkAuthNumber(String userEmail, int number);
    void sendEmail(MailDto mailDto);

    User getSnsUser(String snsId);
    public String snsSignUp(String memberId, String id);
}
