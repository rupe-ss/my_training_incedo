package com.playground.api.dto;

import java.util.ArrayList;
import java.util.List;

import com.playground.api.model.Manager;

public class ManagerDto {

	private Long id;
	private String name;
	private String email;
	private String password;
	private String imageUrl;
	private String jobTitle;
	private String role;

	public ManagerDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ManagerDto(Long id, String name, String email, String password, String imageUrl, String jobTitle,
			String role) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.imageUrl = imageUrl;
		this.jobTitle = jobTitle;
		this.role = role;
	}

	public ManagerDto(String name, String jobTitle, String role) {
		this.name = name;
		this.jobTitle = jobTitle;
		this.role = role;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "ManagerDto [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", imageUrl="
				+ imageUrl + ", jobTitle=" + jobTitle + ", role=" + role + "]";
	}
	
	public static ManagerDto convertToDto(Manager manager) {
		ManagerDto dto = new ManagerDto();
		dto.setId(manager.getId());
		dto.setEmail(manager.getUser().getUsername());
		dto.setName(manager.getName());
		dto.setJobTitle(manager.getJobTitle());
		dto.setRole(manager.getUser().getRole());
		dto.setImageUrl("");
		dto.setPassword("");
		
		return dto;  
	}
	
	public static List<ManagerDto> convertToListDto(List<Manager> list){
		List<ManagerDto> listDto = new ArrayList<>();
		for(Manager manager: list) {
			ManagerDto dto = new ManagerDto();
			dto.setId(manager.getId());
			dto.setEmail(manager.getUser().getUsername());
			dto.setName(manager.getName());
			dto.setJobTitle(manager.getJobTitle());
			dto.setRole(manager.getUser().getRole());
			dto.setImageUrl("");
			dto.setPassword("");
			listDto.add(dto);
		}
		return listDto;
	}

}
