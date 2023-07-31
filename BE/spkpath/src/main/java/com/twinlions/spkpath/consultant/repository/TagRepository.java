package com.twinlions.spkpath.consultant.repository;

import com.twinlions.spkpath.consultant.entity.Tag;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface TagRepository extends Repository<Tag, String> {
    Optional<Tag> findByTagName(String tagName);
}
