const axios = require("axios");
const WEATHER = require("../models/Weather")

// Configuring the path to read the environment variable file, .env, to get the weather api key
require('dotenv').config({path: "./../../../.env"});

const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
const oneCallBaseURL = "https://api.openweathermap.org/data/2.5/onecall";

class Weather {

    /**
     * Gets the weather data based on the zipcode and which temp system to converge to (imperial/metric system)
     *
     * @param {number} zipCode The zipcode used to get the weather info from the weather api
     * @param {string} tempMetric This is either "imperial" (use Fahrenheit) or "metric" (use Celsius)
     * @return {JSON} The data response from the weather api call.
     */
    getWeatherDataByZipcode = async (zipCode, tempMetric) => {

        /**
         * Use get api for "By ZIP code" (https://openweathermap.org/current#zip)
         * - The "us" query stands for "United States
         * - "process.env.WEATHER_KEY" is the api key that we get from the .env file
         * - "units" query can be either imperial (Fahrenheit) or metric (Celsius)
         */
        let url = `${baseUrl}?zip=${zipCode},us&appid=${process.env.WEATHER_KEY}&units=${tempMetric}`;

        // Awaitable call to get the information from the weather api and then return the data.
        // TODO: Add error handling for this call
        return (await axios(url)).data;
    }
    /**
     * The One Call API provides the following weather data for any geographical coordinates:
     *   
     *  - Current weather
     *  - Minute forecast for 1 hour
     *  - Hourly forecast for 48 hours
     *  - Daily forecast for 7 days
     *  - Global weather alerts
     *  - Historical weather data for the previous 5 days
     * 
     * Basic format for API call : https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}
     *
     * @param {number} latitude The latitude used to get the weather info from the weather api
     * @param {number} longitude The longitude used to get the weather info from the weather api
     * @param {string} tempMetric This is either "imperial" (use Fahrenheit) or "metric" (use Celsius)
     * @return {JSON} The data response from the weather api call.
     */
    getOneCallWeatherData = async (latitude,longitude, tempMetric) => {

        /**
         * Use get api for "By ZIP code" (https://openweathermap.org/current#zip)
         * - The "us" query stands for "United States
         * - "process.env.WEATHER_KEY" is the api key that we get from the .env file
         * - "units" query can be either imperial (Fahrenheit) or metric (Celsius)
         */
        let url = `${oneCallBaseURL}?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_KEY}&units=${tempMetric}`;

        // Awaitable call to get the information from the weather api and then return the data.
        // TODO: Add error handling for this call
        return (await axios(url)).data;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Mongo Database Functions
    //
     /**
     * Saves the weather data using the zipcode as the unique identifier
     * If it already exists, replace, if not, then add.
     *
     * @param {number} zipCode The zipcode used to identify the document to upsert
     * @param {string} data Weather data to save/update
     * @return {JSON} The data response from the weather api data.
     */
    saveWeatherDataToMongo = async (zipCode, data) => {
        const filter = {
            zip: zipCode
        }

        const replace = {
            ...filter,
            ...data,
            data: Date.now()
        }
        await this.findOneReplace(filter, replace);
    }

    /**
     * Saves Weather data to MongoDb
     *
     * @param {number} zipCode The zipcode used as unique identifier to find the document from mongo
     * @return {JSON} The data response from the mongodb.
     */
    getWeatherDataFromMongo = async (zipCode) => {
        return WEATHER.findOne({zip: zipCode});
    }

    /**
     * If a document already exists with the filter, then replace, if not, add.
     *
     * @param {{zip: number}} filter The filter is the zipcode used as unique identifier to find the document from mongo
     * @return {JSON} The data response from the mongodb.
     */
    async findOneReplace(filter, replace) {
        await WEATHER.findOneAndReplace(filter, replace, {new: true, upsert: true});
    }
}

module.exports = Weather;