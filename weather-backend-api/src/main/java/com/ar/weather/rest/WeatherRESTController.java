package com.ar.weather.rest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ar.weather.mongo.repository.City;
import com.ar.weather.mongo.repository.CityRepository;

/**
 * Capa REST de la aplicacion
 * @author LMB
 *
 */
@RestController
@RequestMapping("/weather")
public class WeatherRESTController {
	
	private final Logger LOGGER = LoggerFactory.getLogger(WeatherRESTController.class);
	
	@Autowired
	private CityRepository cityRepository;
	
	private final String URL_BASE = "https://query.yahooapis.com/v1/public/yql?q=";
	private final String query_weather = "select%20title%2Citem.forecast%20from%20weather.forecast%20where%20woeid%20in%20";
	private final String query_unit = "%20and%20u%3D%22c%22";
	private final String query_no_key = "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	
	@RequestMapping(value = "/getForecast/{city}", method = RequestMethod.GET)
	@ResponseBody
	public String getForecast(@PathVariable("city") String city) {
		
		String query_city = "(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + city.replaceAll(" ", "%20") + "%2C%22)";
		String output = "";
		
		try {
			URL url = new URL(URL_BASE + query_weather + query_city + query_unit + query_no_key);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept-Charset", "UTF-8");

			if (conn.getResponseCode() != 200) {
				LOGGER.error("ERROR de conexion " + conn.getResponseCode());
				return null;
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
			output = br.readLine();

			conn.disconnect();
			
		  } catch (MalformedURLException ex) {
			  LOGGER.error("ERROR - ", ex);
			  throw new RuntimeException(ex);
		  } catch (IOException ex) {
			  LOGGER.error("ERROR - ", ex);
			  throw new RuntimeException(ex);
		  }
		
		return output;
    }

	@RequestMapping(value = "/findAllCities", method = RequestMethod.GET)
	@ResponseBody
	public List<City> findAllCities() {
		List<City> citiesList = new ArrayList<City>();
		citiesList = cityRepository.findAll();
		return citiesList;
	}

	@RequestMapping(value = "/addCity", method = RequestMethod.POST)
	@ResponseBody
	public City addCity(@RequestBody String city) {
		City cityAdded = new City();
		cityAdded.setCity(city);
		cityRepository.insert(cityAdded);
		LOGGER.info("Ciudad persistida: " + cityAdded);
		return cityAdded;
	}

	@RequestMapping(value = "/deleteCity", method = RequestMethod.POST)
	@ResponseBody
	public City deleteCity(@RequestBody String city){
		City citiToDelete = cityRepository.findCity(city);
		cityRepository.delete(citiToDelete);
		LOGGER.info("Ciudad borrada: " + citiToDelete);
		return citiToDelete;
	}

}
