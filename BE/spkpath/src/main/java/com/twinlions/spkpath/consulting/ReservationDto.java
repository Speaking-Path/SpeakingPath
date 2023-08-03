package com.twinlions.spkpath.consulting;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Getter Setter 정의 없이 사용할 수 있음
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    // 회원 아이디
    private String userId;
    // 회원 이름
    private String userName;
    // 상담사 아이디
    private String csltId;
    // 상담사 이름
    private String cslTName;

    // 날짜
    private int year;
    private int month;
    private int day;
    private String time;

    // 상담 정보
    private String rsvInfo;

}
