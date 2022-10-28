package com.playground.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.playground.api.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

	@Query("select e from Employee e where e.user.username=?1")
	Employee getByEmail(String email);

	@Query("select e from Employee e where e.manager.user.username=?1")
	List<Employee> getAllEmployeeByManager(String managerEmail);

	@Query("select e from Employee e where e.manager.user.username=?1 AND e.user.enabled=?2")
	List<Employee> getAllEmployeeHavingAccess(String username, boolean isEnabled);
}

/*
 JpaRepository<I> : save() findById()  findAll()  deleteById()  saveAll() 
 
  IOC: Inversion of Control 
 */