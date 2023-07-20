package com.twinlions.spkpath.user.repository;

import com.twinlions.spkpath.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository extends JpaRepository<User, String> {

}
