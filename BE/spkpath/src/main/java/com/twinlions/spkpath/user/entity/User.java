package com.twinlions.spkpath.user.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data // Getter & Setter
@NoArgsConstructor // 빈생성자 생성
@SuperBuilder
@AllArgsConstructor // 모든컬럼생성자 생성
@Table(name = "user_tb") // user_tb와 매칭
@DynamicInsert // Null 인것은 자동으로 제외하고 넣어줌
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements UserDetails {
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

//    @ElementCollection(fetch = FetchType.EAGER)
    @Column(name = "user_grade")
//    private List<String> userGrade = new ArrayList<>();
    private String userGrade;

    @Column(name = "user_reward")
    private int userReward;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
//        return this.userGrade.stream()
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return this.userPwd;
    }

    @Override
    public String getUsername() {
        return this.userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
