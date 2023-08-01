package com.twinlions.spkpath.consultant;

import com.twinlions.spkpath.consultant.entity.ConsultantBoundary;
import com.twinlions.spkpath.consultant.entity.ConsultantTag;
import com.twinlions.spkpath.user.UserDto;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Data // Getter Setter 정의 없이 사용할 수 있음
@NoArgsConstructor
@AllArgsConstructor

public class ConsultantDto extends UserDto {
    private String csltTeam;
    private int csltExp;

    private List<String> csltTag;
    private List<String> csltBoundary;

    public void setCsltTagFromList(List<ConsultantTag> csltTags) {
        this.csltTag = csltTags.stream()
                .map(tag -> tag.getTag().getTagName())
                .collect(Collectors.toList());
    }

    public void setCsltBoundaryFromList(List<ConsultantBoundary> csltBoundaries) {
        this.csltBoundary = csltBoundaries.stream()
                .map(boundary -> boundary.getBoundary().getBoundaryName())
                .collect(Collectors.toList());
    }
}
