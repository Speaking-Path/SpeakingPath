package com.twinlions.spkpath.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LoginUser  {

    private String loginId;
    private String authority;
    private boolean snsUser;
}
