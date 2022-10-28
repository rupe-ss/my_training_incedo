package com.playground.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.playground.api.model.Manager;

public interface ManagerRepository extends JpaRepository<Manager, Long>{

	//jpql => java persistence query language
	@Query("select m from Manager m where m.user.username=?1")
	Manager getByEmail(String managerEmail);
	
	

	/* Once JpRepository is extends we can use all the method in this interface.   
	 * */
}
