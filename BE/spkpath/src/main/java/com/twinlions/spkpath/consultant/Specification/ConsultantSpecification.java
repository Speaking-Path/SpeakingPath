package com.twinlions.spkpath.consultant.Specification;

import com.twinlions.spkpath.consultant.entity.Consultant;
import com.twinlions.spkpath.consultant.entity.ConsultantBoundary;
import com.twinlions.spkpath.consultant.entity.ConsultantTag;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;

public class ConsultantSpecification {

    // userName 속성으로 name을 포함하는 상담사 조회
    public static Specification<Consultant> equalsName(String name) {
        return (root, query, CriteriaBuilder) -> {
            System.out.println(root.get("userName"));
            return CriteriaBuilder.like(root.get("userName"), "%" + name + "%");
        };
    }

    // userSex 속성이 sex인 상담사 조회
    public static Specification<Consultant> equalsSex(String sex) {
        return (root, query, CriteriaBuilder) -> CriteriaBuilder.equal(root.get("userSex"), sex);
    }

    // csltExp 값이 미리 설정한 범위 내인 상담사 조회
    public static Specification<Consultant> betweenExp(int expVal) {
        if (expVal == 3) {
            return (root, query, CriteriaBuilder) -> CriteriaBuilder.between(root.get("csltExp"), 0, 3);
        } else if (expVal == 5) {
            return (root, query, CriteriaBuilder) -> CriteriaBuilder.between(root.get("csltExp"), 4, 5);
        } else if (expVal == 10) {
            return (root, query, CriteriaBuilder) -> CriteriaBuilder.between(root.get("csltExp"), 6, 10);
        } else if (expVal == 11) {
            return (root, query, CriteriaBuilder) -> CriteriaBuilder.greaterThanOrEqualTo(root.get("csltExp"), 11);
        }
        return null;
    }

    // tag를 csltTag 속성에 포함하고 있는 상담사 조회
    public static Specification<Consultant> containsTag(String tag) {
        return (root, query, cb) -> {
            Join<Consultant, ConsultantTag> tagJoin = root.join("csltTags", JoinType.INNER);
            return cb.equal(tagJoin.get("tag").get("tagName"), tag);
        };
    }

    // boundary를 csltBoundary 속성에 포함하고 있는 상담사 조회
    public static Specification<Consultant> containsBoundary(String boundary) {
        return (root, query, cb) -> {
            Join<Consultant, ConsultantBoundary> boundaryJoin = root.join("csltBoundaries", JoinType.INNER);
            return cb.equal(boundaryJoin.get("boundary").get("boundaryName"), boundary);
        };
    }

}
