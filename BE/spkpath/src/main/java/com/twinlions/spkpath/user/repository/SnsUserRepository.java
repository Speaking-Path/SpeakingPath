package com.twinlions.spkpath.user.repository;

import com.twinlions.spkpath.user.entity.SnsUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SnsUserRepository extends JpaRepository<SnsUser, String> {
}