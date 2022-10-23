package com.playground.api.dto;

public class EmployeeDto {

	private String name;
	private String jobTitle;
	private String managerEmail;
	private String email;
	private String password;
	
	public EmployeeDto() {
		  
	}

	public EmployeeDto(String name, String jobTitle, String managerEmail, String email, String password) {
		super();
		this.name = name;
		this.jobTitle = jobTitle;
		this.managerEmail = managerEmail;
		this.email = email;
		this.password = password;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getManagerEmail() {
		return managerEmail;
	}
	public void setManagerEmail(String managerEmail) {
		this.managerEmail = managerEmail;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
