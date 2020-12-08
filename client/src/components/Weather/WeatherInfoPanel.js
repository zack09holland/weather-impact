import React, {Component} from "react";
import {connect} from "react-redux";
import {compose} from 'redux'
import { withStyles } from "@material-ui/styles";
import styles from "../../stylesheets/WeatherStyles/WeatherInfoPanel";

class WeatherInfoPanel extends Component {
 // Differentiates whether user chose to use Celsius or Fahrenheit
 getMetric = () => {
    let metric = localStorage.getItem("tempMetric");
    metric = !!metric ? metric : "";
    return metric.includes("metric") ? "°C" : "°F";
}
    render() {
        const {weatherData, classes} = this.props;
        let metricSymbol = this.getMetric();

        if (Object.keys(weatherData).length > 0) {
            const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            return (
                <section className={classes.weatherInfo}>
                    <h3 className={classes.cityName}>{weatherData.name}</h3>

                    <section className={classes.overcast}>
                        <img src={iconUrl}  alt=""/>
                        <span >{weatherData.weather[0].description}</span>
                    </section>

                    <hr/>

                    <section className={classes.currentWeather}>
                        <span>Humidity: {weatherData.main.humidity}%</span>
                        <span >Temp: {weatherData.main.temp}{metricSymbol}</span>
                        <span >Feels like: {weatherData.main.feels_like}{metricSymbol}</span>
                    </section>

                    <hr/>

                    <section className={classes.temperature}>
                        <span>Low: {weatherData.main.temp_min}{metricSymbol}</span>
                        <span>High: {weatherData.main.temp_max}{metricSymbol}</span>
                    </section>
                </section>
            );
        }
        return (
            <section>
                WeatherInfo!
            </section>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        weatherData: state.weather
    }
};

export default compose(withStyles(styles), connect(mapStateToProps)) (WeatherInfoPanel);
