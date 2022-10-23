package com.playground.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.playground.api.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
