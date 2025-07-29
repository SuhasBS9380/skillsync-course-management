package com.skylsync.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.skylsync.admin"})
public class AdminCourseBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminCourseBackendApplication.class, args);
	}

}
