package com.playground.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.playground.api.dto.ManagerDto;
import com.playground.api.model.Manager;
import com.playground.api.model.User;
import com.playground.api.repositories.ManagerRepository;
import com.playground.api.repositories.UserRepository;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ManagerRepository managerRepository;
	
	@PostMapping("/add")
	public ResponseEntity<String> addManager(@RequestBody ManagerDto dto) {
		/* Save User */
		User user = new User(); //POJO
		user.setUsername(dto.getEmail());
		user.setPassword(dto.getPassword());
		user.setRole(dto.getRole());
		
		user = userRepository.save(user);
		/* Save manager*/
		Manager manager = new Manager();
		manager.setUser(user);
		manager.setName(dto.getName());
		manager.setImageUrl(dto.getImageUrl());
		manager.setJobTitle(dto.getJobTitle());
		
		managerRepository.save(manager);
		return ResponseEntity.status(HttpStatus.OK).body("Manager added to the DB");
	}

}
