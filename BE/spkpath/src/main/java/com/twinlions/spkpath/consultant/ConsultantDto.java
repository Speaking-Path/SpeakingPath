package com.twinlions.spkpath.consultant;

import com.twinlions.spkpath.user.UserDto;
import com.twinlions.spkpath.user.entity.User;
import lombok.*;

import java.util.List;

@Data // Getter Setter 정의 없이 사용할 수 있음
@NoArgsConstructor
@AllArgsConstructor

public class ConsultantDto extends UserDto {
    private String csltTeam;
    private int csltExp;
    private List<String> csltTag;
    private List<String> csltBoundary;
}
