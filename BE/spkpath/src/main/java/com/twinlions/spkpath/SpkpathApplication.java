package com.twinlions.spkpath;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(scanBasePackages = "com.twinlions.spkpath")
public class SpkpathApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpkpathApplication.class, args);
	}

}
