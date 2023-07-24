package com.twinlions.spkpath.user.service;

import com.twinlions.spkpath.counselor.CounselorDto;
import com.twinlions.spkpath.user.UserDto;
import com.twinlions.spkpath.user.entity.User;


import java.util.List;

public interface UserService {
    String join(UserDto userDto);
    int cnslrJoin(CounselorDto cnslrDto);
    int login(UserDto userDto);
    int checkId(String userId);
    int checkEmail(String userEmail);
}
