package com.example.pet_app;

import com.example.pet_app.security.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class PetAppApplication {

	public static void main(String[] args) {SpringApplication.run(PetAppApplication.class, args);
	}

}
