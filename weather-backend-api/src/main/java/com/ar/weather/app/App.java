package com.ar.weather.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * Clase encargada de iniciar la aplicación.
 * @author LMB
 *
 */
@SpringBootApplication(scanBasePackages={"com.ar.weather"})
@EnableMongoRepositories({"com.ar.weather.mongo.repository"})
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
	
}
