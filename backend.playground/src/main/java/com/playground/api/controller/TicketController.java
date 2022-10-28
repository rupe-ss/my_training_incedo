package com.playground.api.controller;

import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.playground.api.dto.ReqTicketDto;
import com.playground.api.dto.ResponseDto;
import com.playground.api.dto.TicketDto;
import com.playground.api.enums.PriorityEnum;
import com.playground.api.enums.TicketStatus;
import com.playground.api.model.Employee;
import com.playground.api.model.Ticket;
import com.playground.api.repositories.EmployeeRepository;
import com.playground.api.repositories.TicketRepository;

@RestController
@RequestMapping("/api/ticket")
@CrossOrigin(origins = {"http://localhost:4200"})
public class TicketController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private TicketRepository ticketRepository;

	@Autowired
	private ResponseDto responseDto;
	
	@PostMapping("/add")
	public Ticket postTicket(@RequestBody TicketDto dto, Principal principal) {
		String username = principal.getName();
		/* Assigning dto values to Ticket model*/
		Ticket ticket = new Ticket();
		ticket.setIssue(dto.getIssue());
		// Converting string to Enum
		ticket.setPriority(PriorityEnum.valueOf(dto.getPriority()));
		ticket.setGeneratedDate(LocalDate.now());
		ticket.setStatus(TicketStatus.OPEN);
		
		/* Fetch employee by Username*/
		Employee employee = employeeRepository.getByEmail(username);
		
		responseDto.setMsg("Invalid Request/Data");
		/* Attach employee to ticket*/
		ticket.setEmployee(employee);
		
		/* */
		ticket = ticketRepository.save(ticket);
		
		ticketRepository.save(ticket);
		
		return ticket;
	}
	
	@GetMapping("/priority/all")
	public List<String> getAllPriorities() {
		List<String> list = new ArrayList<>();
		for(PriorityEnum val : PriorityEnum.values()) {
			list.add(val.toString());
		}
		
		return list;
	}
	
	@GetMapping("/status/{status}")
	public List<TicketDto> getAllTickets(Principal principal, @PathVariable("status") String status) {
		String username = principal.getName();
		TicketStatus statusEnum =  TicketStatus.valueOf(status);
		
		List<Ticket> list = ticketRepository.getAllTicketByUsernameAndStatus(username, statusEnum);
		List<TicketDto> listDto= TicketDto.convertToListDto(list);
		return listDto;
	}
	
	@PutMapping("/status/update")
	public ResponseEntity<ResponseDto> updateTicketStatus(@RequestBody ReqTicketDto dto) {
		/* Fetch Ticket from DB by ticketID*/
		Optional<Ticket> optional = ticketRepository.findById(dto.getTicketId());
		if(!(optional.isPresent())){
			responseDto.setMsg("Ticket ID Invalid");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDto);
		}
		Ticket ticket = optional.get();
		/* Update the status */
		ticket.setStatus(TicketStatus.valueOf(dto.getStatus()));
		/* Save it back again.*/
		
		ticketRepository.save(ticket);
		responseDto.setMsg("Ticket Closed");
		return ResponseEntity.status(HttpStatus.OK).body(responseDto);
	}
}
