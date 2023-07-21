package com.twinlions.spkpath.user.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data // Getter & Setter
@NoArgsConstructor // 빈생성자 생성
@Builder // DTO -> Entity화
@AllArgsConstructor // 모든컬럼생성자 생성
@Table(name = "user_tb") // user_tb와 매칭
@DynamicInsert // Null 인것은 자동으로 제외하고 넣어줌
public class User {
    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_pwd", nullable = false)
    private String userPwd;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_email", nullable = false, unique = true)
    private String userEmail;

    @Column(name = "user_phone", nullable = false, unique = true)
    private String userPhone;

    @Column(name = "user_info")
    private String userInfo;

    @Column(name = "user_age")
    private int userAge;

    @Column(name = "user_sex")
    private String userSex;

    @Column(name = "user_pic")
    private String userPic;

    @Column(name = "user_grade")
    private String userGrade;

    @Column(name = "user_reward")
    private int userReward;
}
