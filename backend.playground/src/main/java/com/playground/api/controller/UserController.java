package com.playground.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.playground.api.dto.ResponseDto;
import com.playground.api.model.User;
import com.playground.api.repositories.UserRepository;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ResponseDto responseDto;

	@GetMapping("/grant-access/{email}")
	public ResponseEntity<ResponseDto> grantAccess(@PathVariable("email") String username ) {
		/* Fetch user record by username */
		User user = userRepository.findUserByUsername(username);
		if(user == null) {
			responseDto.setMsg("Username Data invalid");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDto);
		}
		
		/* enable the user */
		user.setEnabled(true);
		/* Save the user back again*/
		userRepository.save(user);
		responseDto.setMsg("User Activated");
		return ResponseEntity.status(HttpStatus.OK).body(responseDto);
	}
}
