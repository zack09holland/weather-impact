import "./stylesheets/AppStyles.js";
import Container from "./components/WeatherByZipcode/Container";
import "bootstrap/dist/css/bootstrap.min.css";

import { Switch, Route } from "react-router-dom";
import {withStyles} from '@material-ui/styles'
import styles from './stylesheets/AppStyles'

import Dashboard from "./components/Dashboard.js";
import Map from "./components/Mapping/Map";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

function App(props) {
	const {classes} = props;
	return (
		<div className={classes.App}>
			<Switch>
				<Route exact path="/weather" render={(routeProps) => <Container />} />
				<Route exact path="/live-map" render={(routeProps) => <Dashboard />} />
				<Route exact path="/test-map" render={(routeProps) => <Map />} />
			</Switch>
		</div>
	);
}

export default withStyles(styles) (App);
