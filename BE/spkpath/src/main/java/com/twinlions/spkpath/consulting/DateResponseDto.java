package com.twinlions.spkpath.consulting;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Getter Setter 정의 없이 사용할 수 있음
@NoArgsConstructor
@AllArgsConstructor
public class DateResponseDto {
    private int year;
    private int month;
    private int day;
    private String time;
}
