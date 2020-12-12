import React, { useState, useEffect } from "react";
import { useStore } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";

import { withStyles } from "@material-ui/core/styles";
import styles from "../stylesheets/DashboardStyles";

import Map from "./Mapping/Map";
import NavBar from "./NavBar";
import LayerPanel from "./LayerPanel/LayerPanel";
import DataPanel from "./DataPanel/DataPanel";
import getPropertyData from "../assets/APIs/getPropertyData";
import useToggle from "../assets/hooks/useToggle";

function Dashboard(props) {
	const { classes } = props;
	// Initialize the Redux store so we can access the redux state
	const store = useStore();

	const [showSpinner, setShowSpinner] = useState(true);
	const [dataPanel, toggleDataPanel] = useToggle(false);
	const [layerPanel, toggleLayerPanel] = useToggle(false);

	// Get the property data from the server and set the state
	// This is called from this component as the dashboard will
	// be the parent component that contains the map interface
	// as well as the layer control panel
	//	-getPropertyData is called from a seperate js file
	useEffect(() => {
		toggleLayerPanel(true)
		getPropertyData().then((data) => {
			// Save the property data to the Redux store
			store.dispatch({ type: "SAVE_PROPERTY_DATA", payload: data });
			// When the data is finished loading turn the spinner off
			setShowSpinner(false);
		});
	}, []);

	return (
		<div className={classes.root}>
			<CssBaseline />

			<main className={classes.content}>
				<NavBar toggleDataPanel={toggleDataPanel} />
				<LayerPanel
					toggleLayerPanel={toggleLayerPanel}
					layerPanel={layerPanel}
				/>
				<Map
					layerPanel={layerPanel}
					dataPanel={dataPanel}
					showSpinner={showSpinner}
				/>

				<DataPanel toggleDataPanel={toggleDataPanel} dataPanel={dataPanel} />
			</main>
		</div>
	);
}
export default withStyles(styles, { withTheme: true })(Dashboard);
