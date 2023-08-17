package com.twinlions.spkpath.consultant;

import lombok.*;

import java.util.List;

@Data // Getter Setter 정의 없이 사용할 수 있음
@NoArgsConstructor
@AllArgsConstructor

public class ConsultantSearchDto {
    private String userName;
    private String userSex;
    private int csltExp;
    private List<String> csltTag;
    private List<String> csltBoundary;
}
