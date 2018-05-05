package com.ar.weather.mongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Capa de acceso a datos
 * @author LMB
 *
 */
@Repository
public interface CityRepository extends MongoRepository<City, Long>{

	/**
	 * Retorna una unica ciudad dentro de la coleccion de ciudades
	 * @param cityId
	 * @return city
	 */
	@Query("{'city' : ?0 }")
	public City findCity(String city);
	
}
