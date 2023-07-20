package com.twinlions.spkpath.user.service;

import com.twinlions.spkpath.user.UserDto;

public interface UserService {
    String join(UserDto userDto);
    int login(UserDto userDto);
}
