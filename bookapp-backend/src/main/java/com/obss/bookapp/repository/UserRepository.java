package com.obss.bookapp.repository;

import com.obss.bookapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUserName(String userName);
}
