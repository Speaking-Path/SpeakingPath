package com.twinlions.spkpath.consultant.Specification;

import com.twinlions.spkpath.consultant.entity.Consultant;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ConsultantSpecification {

    public static Specification<Consultant> equalsName(String name) {
        System.out.println(name);
        return (root, query, CriteriaBuilder) -> CriteriaBuilder.like(root.get("userName"), "%" + name + "%");
    }

    public static Specification<Consultant> betweenExp(int expVal) {
        if (expVal == 3) {
            return (root, query, CriteriaBuilder) -> CriteriaBuilder.between(root.get("csltExp"), 0, 3);
        } else if (expVal == 5) {
            return (root, query, CriteriaBuilder) -> CriteriaBuilder.between(root.get("csltExp"), 4, 5);
        } else if (expVal == 10) {
            return (root, query, CriteriaBuilder) -> CriteriaBuilder.between(root.get("csltExp"), 6, 10);
        } else if (expVal == 11) {
            return (root, query, CriteriaBuilder) -> CriteriaBuilder.between(root.get("csltExp"), 11, 9999);
        }
        return null;
    }

    public static Specification<Consultant> equalsSex(String sex) {
        return (root, query, CriteriaBuilder) -> CriteriaBuilder.equal(root.get("userSex"), sex);
    }

    public static List<Specification<Consultant>> containsTag(List<String> tags) {
        List<Specification<Consultant>> sList = new ArrayList<>();

        for (int i = 0; i < tags.size(); i++) {
            String tag = tags.get(i);
//            sList.add((root, query, CriteriaBuilder) -> CriteriaBuilder.in(root.get("csltTag"), tag));
            sList.add((root, query, CriteriaBuilder) -> {
                System.out.println(root.get("csltTag"));

                return CriteriaBuilder.isMember(tag, root.get("csltTag"));
            });
        }
            return sList;
    }

    public static List<Specification<Consultant>> containsBoundary(List<String> boundaries) {
        List<Specification<Consultant>> sList = new ArrayList<>();
        for (int i = 0; i < boundaries.size(); i++) {
            String boundary = boundaries.get(i);
            sList.add((root, query, CriteriaBuilder) -> CriteriaBuilder.isMember(boundary, root.get("csltBoundary")));
        }
        return sList;
    }

}
