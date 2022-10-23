package com.playground.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.playground.api.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

	@Query("select e from Employee e where e.user.username=?1")
	Employee getByEmail(String email);

}

/*
 JpaRepository<I> : save() findById()  findAll()  deleteById()  saveAll() 
 
  IOC: Inversion of Control 
 */