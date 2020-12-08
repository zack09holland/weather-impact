//Use express's router to route all our API endpoints
const express = require("express");
const router = express.Router();

// Use the weather class to call our method that will get the weather data
const Weather = require("./weather");
// Use the property class to call our method to get the property data saved in our database
const Property = require("./property");


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Weather Data Requests
//
// GET request - statically get the weather data from the weather API
router.get("/weather", async (req, res) => {
	try {
		let weather = new Weather();

		//Fixing the params of zipcode and tempMetric for an example GET request
		let weatherData = await weather.getWeatherDataByZipcode(98117, "us");
		// let oneCallWeatherData = await weather.getOneCallWeatherData(47,-122,"us")

		// Content that will be sent will be a prettified json
		res.header("Content-type", "application/json");
		res.write(JSON.stringify(weatherData, null, 4));
		// res.write(JSON.stringify(oneCallWeatherData,null,4));
	} catch (error) {
		console.log(error);
	}
});

// POST request - dynamically get the weather data based on the request body
router.post("/weather", async (req, res) => {
	try {
		// const {zipCode, latitude, longitude, tempMetric} = req.body;
		const { zipCode, tempMetric } = req.body;
		let weather = new Weather();

		// The params for zipCode and tempMetric are dynamic
		let weatherData = await weather.getWeatherDataByZipcode(
			zipCode,
			tempMetric
		);
		// let oneCallWeatherData = await weather.getOneCallWeatherData(latitude,longitude,tempMetric)

		res.header("Content-type", "application/json");
		res.send(JSON.stringify(weatherData, null, 4));
		// res.write(JSON.stringify(oneCallWeatherData,null,4))
	} catch (error) {
		console.log(error);
	}
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Weather Data From Mongo Requests
//
// POST Request - get the weather data from the api, save it to mongo, then return the data back
router.post("/weatherMongo", async (req, res) => {
	const { zipCode, tempMetric } = req.body;
	let weather = new Weather();
	let weatherData = await weather.getWeatherData(zipCode, tempMetric);

	await weather.saveWeatherDataToMongo(zipCode, weatherData);
	res.header("Content-Type", "application/json");
	res.send(JSON.stringify(weatherData, null, 4));
});

// GET Request - get the weather data saved from Mongo
router.get("/weatherMongo", async (req, res) => {
	const { zipCode } = req.query;
	let weather = new Weather();

	let weatherData = await weather.getWeatherDataFromMongo(zipCode);
	res.header("Content-Type", "application/json");
	res.send(JSON.stringify(weatherData, null, 4));
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Property Data Requests
//

// GET Request - get the property data saved from Mongo
router.get("/property-data", async (req, res) => {
	let properties = new Property();
	let propertyData = await properties.getPropertyDataFromMongo();
	console.log(propertyData)
	res.header("Content-Type", "application/json");
	res.send(JSON.stringify(propertyData, null, 4));
});

module.exports = router;
