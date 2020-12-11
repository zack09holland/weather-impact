import React, { useState } from "react";
import {withStyles} from '@material-ui/styles'
import styles from '../../stylesheets/WeatherStyles/Container'

import Header from "../Header";
import WeatherForm from "./WeatherForm";
import WeatherPanels from "./WeatherPanels";

function Container(props) {
	const [weatherData, setWeatherData] = useState(null);
	const{classes} = props
	return (
		<section className={classes.weather}>
			<Header />
			<WeatherForm />
			<WeatherPanels weatherData={weatherData} />
		</section>
	);
}

export default withStyles(styles)(Container);
