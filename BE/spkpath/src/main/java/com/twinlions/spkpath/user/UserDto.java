package com.twinlions.spkpath.user;


import lombok.*;

@Data // Getter Setter 정의 없이 사용할 수 있음
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String userId;
    private String userPwd;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String userInfo;
    private int userAge;
    private String userSex;
    private String userPic;
    private String userGrade;
    private int userReward;
}
