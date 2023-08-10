package com.twinlions.spkpath.user.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

@Entity
@Data // Getter & Setter
@NoArgsConstructor // 빈생성자 생성
@SuperBuilder
@AllArgsConstructor // 모든컬럼생성자 생성
@Table(name = "user_tb") // user_tb와 매칭
@DynamicInsert // Null 인것은 자동으로 제외하고 넣어줌
@DynamicUpdate
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

    public String getUserName() {
        return userName;
    }

    public void updateUserReward(int reward) {
        this.userReward = reward;
    }

    @ColumnDefault("false")
    @Column(columnDefinition = "TINYINT(1)")
    private boolean activated;

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return null;
//        return this.authorities.stream()
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
        Collection<GrantedAuthority> collectors = new ArrayList<>();
        collectors.add(()->{return "ROLE_"+userGrade;}); //add에 들어올 파라미터는 GrantedAuthority밖에 없으니
        return collectors;
    }

    @Override
    public String getPassword() {
        return this.userPwd;
    }

    @Override
    public String getUsername() {
        return this.userName;
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
