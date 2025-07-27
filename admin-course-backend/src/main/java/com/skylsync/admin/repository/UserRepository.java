package com.skylsync.admin.repository;

import com.skylsync.admin.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
} 