package com.twinlions.spkpath.consulting;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data // Getter Setter 정의 없이 사용할 수 있음
@NoArgsConstructor
@AllArgsConstructor
public class DateRequestDto {
    private int year;
    private int month;
    private List<Integer> days;
}
