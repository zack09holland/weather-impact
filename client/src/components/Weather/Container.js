import React, { useState } from "react";
import Header from "../Header";
import WeatherForm from "./WeatherForm";
import WeatherPanels from "./WeatherPanels";

function Container() {
	const [weatherData, setWeatherData] = useState(null);
	return (
		<section className="weather container">
			<Header />
			<WeatherForm />
			<WeatherPanels weatherData={weatherData} />
		</section>
	);
}

export default Container;
