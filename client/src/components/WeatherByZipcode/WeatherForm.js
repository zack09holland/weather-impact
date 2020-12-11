import React, {Component} from "react";
import {Form, Button, Row, Col, ButtonGroup, ToggleButton} from "react-bootstrap";
import {withStyles} from '@material-ui/styles'
import styles from '../../stylesheets/WeatherStyles/WeatherForm'
import axios from 'axios';

import {connect} from "react-redux";
import {compose} from 'redux'
import {saveZipCode, saveWeatherData, saveTemperature, updateHistory} from "../../actions";

class WeatherForm extends Component {
    // default state values
    state = {
        tempMetric: "imperial",
        zipCodeInput: "98052"
    }

    componentDidMount() {
        this.refreshSavedWeather();
    }

    // Refreshes the current weather data for the most recent zip code, if it exists
    refreshSavedWeather = () => {
        if (localStorage.getItem("zipCode")) {
            axios.post("/api/weather", {
                zipCode: localStorage.getItem("zipCode"),
                tempMetric: localStorage.getItem("tempMetric")
            }).then(d => {
				console.log("got weather data from local storage")
                localStorage.setItem("CurrentWeatherData", JSON.stringify(d.data));
                this.props.saveWeatherData(d.data);
            });
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    saveFormData = (event) => {
        event.preventDefault();
		console.log("submitted")
        // Gets the weather data from the weather api and returns it to save into local storage and redux store.
        axios.post("/api/weather", {
            zipCode: this.state.zipCodeInput,
            tempMetric: this.state.tempMetric
        }).then(response => {
            let weatherData = response.data;
			console.log(weatherData)
			this.saveToMongo(weatherData);
			this.saveToStore(weatherData)
            this.saveToLocalStorage(weatherData);
        });
    }

    // Save data from form to local storage
    saveToLocalStorage = (weatherData) => {
        localStorage.setItem("zipCode", this.state.zipCodeInput);
        localStorage.setItem("tempMetric", this.state.tempMetric);
        localStorage.setItem("CurrentWeatherData", JSON.stringify(weatherData));
        localStorage.setItem("WeatherHistory", JSON.stringify(this.props.history));
    }

	saveToStore = (weatherData) => {
		this.props.saveTemperature(this.state.tempMetric);
		this.props.saveZipCode(this.state.zipCodeInput);
		this.props.saveWeatherData(weatherData);
		this.props.updateHistory({
            timestamp: (new Date()).toLocaleString(),
            city: weatherData.name,
            zipcode: this.state.zipCodeInput,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description
        });
	}

	saveToMongo = (event) => {
        axios.post("/api/weatherMongo", {
            zipCode: this.state.zipCodeInput,
            tempMetric: this.state.tempMetric
        }).then(response => {
            // do whatever you want with the weather data
            // let weatherData = response.data;

        });
	}
	
    render() {
        const{classes}= this.props
        return (
            <Form className={classes.weatherForm} onSubmit={this.saveFormData}>

                <Row type="flex" justify="center" align="center" className="zipCode">
                    <Col>
                        <span>Zip Code: </span>
                        <Form.Control name="zipCodeInput"
                                      type="text"
                                      placeholder="Enter your zip code"
                                      onChange={this.onChange}
                                      className={classes.zipCodeInput}/>
                    </Col>
                </Row>

                <Row type="flex" justify="center" align="center">
                    <Col span={4}>
                        <ButtonGroup toggle>
                            <ToggleButton
                                key={"C"}
                                type="radio"
                                variant="secondary"
                                name="tempMetric"
                                value={"metric"}
                                checked={this.state.tempMetric === "metric"}
                                onChange={this.onChange}
                            >
                                Celsius (°C)
                            </ToggleButton>
                            <ToggleButton
                                key={"F"}
                                type="radio"
                                variant="secondary"
                                name="tempMetric"
                                value={"imperial"}
                                checked={this.state.tempMetric === "imperial"}
                                onChange={this.onChange}
                            >
                                Fahrenheit (°F)
                            </ToggleButton>
                        </ButtonGroup>
                    </Col>
                </Row>

                <Row type="flex" justify="center" align="center">
                    <Col span={4}>
                        <Button className={classes.saveBtn} variant="primary" type="submit">
                            Save
                        </Button>
                    </Col>
                </Row>

            </Form>
        );
    }
}

// Mapping state from the store to props;
// meaning...if we update these props, it'll update the redux store
const mapStateToProps = (state) => {
    return {
        zipCode: state.zipCode,
        weather: state.weather,
        tempMetric: state.tempMetric,
        history: state.history
    }
};

// These are the actions we can dispatch and just mapping it to props
const mapDispatchToProps = () => {
    return {
        saveZipCode,
        saveWeatherData,
        saveTemperature,
        updateHistory
    }
};

// This connects our mapping the state & dispatch to props to use in WeatherForm
export default compose( connect(mapStateToProps, mapDispatchToProps()), withStyles(styles))(WeatherForm);
