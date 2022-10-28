package com.playground.api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		auth.inMemoryAuthentication()
			.passwordEncoder(getEncoder())
			.withUser("harry@gmail.com").password(getEncoder().encode("harry@123")).authorities("EMPLOYEE")
			.and()
			.withUser("draco@gmail.com").password(getEncoder().encode("draco@123")).authorities("EMPLOYEE")
			.and()
			.withUser("ronald@gmail.com").password(getEncoder().encode("ronald@123")).authorities("EMPLOYEE")
			.and()
			.withUser("albus@gmail.com").password(getEncoder().encode("albus@123")).authorities("MANAGER")
			.and()
			.withUser("severus@gmail.com").password(getEncoder().encode("severus@123")).authorities("MANAGER");

	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.authorizeRequests()
			.antMatchers(HttpMethod.GET, "/api/manager/all").permitAll()
			.antMatchers(HttpMethod.POST, "/api/employee/add").permitAll()
			.antMatchers(HttpMethod.GET, "/api/employee/all").hasAuthority("MANAGER")
			.antMatchers(HttpMethod.GET, "/api/auth/login").permitAll()
			.antMatchers(HttpMethod.POST, "/api/leave/add").hasAnyAuthority("EMPLOYEE", "MANAGER")
			.antMatchers(HttpMethod.POST, "/api/ticket/add").permitAll()
			.antMatchers(HttpMethod.GET, "/api/ticket/priority/all").permitAll()
			.antMatchers(HttpMethod.GET, "/api/employee/access").hasAuthority("MANAGER")
			.antMatchers(HttpMethod.GET, "/api/user/grant-access/{email}").hasAuthority("MANAGER")
			.antMatchers(HttpMethod.GET, "/api/leave/all").hasAuthority("MANAGER")
			.antMatchers(HttpMethod.GET, "/api/leave/update-status/all").hasAuthority("MANAGER")
			.anyRequest().permitAll()
			.and().httpBasic()
			.and().csrf().disable();
		/*
		 * http.authorizeRequests() .antMatchers(HttpMethod.POST,
		 * "/api/employee/add").permitAll() .anyRequest().permitAll() .and().httpBasic()
		 * .and().csrf().disable();
		 */
	}

	// We need @Bean to use @Autowired in any other class
	@Bean
	public PasswordEncoder getEncoder() {

		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
	}

}
