package com.playground.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.playground.api.dto.EmployeeDto;
import com.playground.api.dto.ManagerDto;
import com.playground.api.model.Employee;
import com.playground.api.model.Manager;
import com.playground.api.model.User;
import com.playground.api.repositories.EmployeeRepository;
import com.playground.api.repositories.ManagerRepository;
import com.playground.api.repositories.UserRepository;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
	
	@Autowired
	ManagerRepository managerRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder encoder; 
	
	@PostMapping("/add")
	public ResponseEntity<String> addEmployee(@RequestBody EmployeeDto dto) {
		 
		/* managerEmail is valid */
		System.out.println(dto.getManagerEmail());
		Manager manager = managerRepository.getByEmail(dto.getManagerEmail());
		System.out.println(manager);
		if(manager == null)
				return ResponseEntity
						.status(HttpStatus.BAD_REQUEST)
						.body("Manager Email Invalid");
		
		/* Employee email is not already present */
		Employee employee = employeeRepository.getByEmail(dto.getEmail());
		if(! (employee == null) )
				return ResponseEntity
						.status(HttpStatus.BAD_REQUEST)
						.body("Employee Already Exists");
		
		/* Password is encrypted */
		 String encryptedPassword = encoder.encode(dto.getPassword());
		
		/* Save record in employee and user table */
		User user = new User();
		user.setUsername(dto.getEmail());
		user.setPassword(encryptedPassword);
		user.setRole("EMPLOYEE");
		user = userRepository.save(user);
		
		employee = new Employee();
		employee.setUser(user);
		employee.setName(dto.getName());
		employee.setJobTitle(dto.getJobTitle());
		
		employeeRepository.save(employee);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body("Employee Record Added");
	}
	
	@GetMapping("/hello")
	public String hello() {
		return "hello world";
	}
	
	@GetMapping("/employee")
	public ResponseEntity<ManagerDto> getEmployeeDetails() {
		String email = "albus@gmail.com";
		Manager manager = new Manager();
		manager = managerRepository.getByEmail(email);
		
		ManagerDto managerDto = new ManagerDto(manager.getName(), manager.getJobTitle(), manager.getUser().getRole());
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(managerDto);
	}
}
