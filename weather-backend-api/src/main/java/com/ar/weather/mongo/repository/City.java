package com.ar.weather.mongo.repository;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

/**
 * Entidad que representa una ciudad
 * @author LMB
 *
 */

@Document(collection = "ciudades")
@JsonPropertyOrder({"id, city"})
public class City {
	
	@Id
	@NotNull
	private String id;
	
	@NotNull
	private String city;
	
	public City() {}
	
	public City(String id, String city){
		this.id = id;
		this.city = city;
	}

	@Override
	public String toString() {
		return String.format(
                "City[id=%s, city='%s']", id, city);
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @param city the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

}
