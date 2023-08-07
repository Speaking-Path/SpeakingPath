package com.twinlions.spkpath.user;

import com.twinlions.spkpath.user.entity.Authority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
@Builder
public class MemberAddDto  {
    private String userId;
    private String userPwd;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String userSex;
//    private Set<Authority> authorities;
    private String snsId;

}
