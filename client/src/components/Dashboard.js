import React, { useState, useEffect } from "react";
import { useStore } from "react-redux";


import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { withStyles } from "@material-ui/core/styles";
import styles from "../stylesheets/DashboardStyles";
import clsx from "clsx";

import Map from "./Mapping/Map";
import NavBar from "./NavBar";
import LayerController from "./LayerController/LayerController";
import getPropertyData from "../assets/APIs/getPropertyData";

function Dashboard(props) {
	const { classes } = props;
	// Initialize the Redux store so we can access the redux state
	const store = useStore();

	const [drawerOpen, setDrawerOpen] = useState(true);
	const [showSpinner, setShowSpinner] = useState(false);

	// Get the property data from the server and set the state
	// This is called from this component as the dashboard will
	// be the parent component that contains the map interface
	// as well as the layer control panel
	//	-getPropertyData is called from a seperate js file
	useEffect(() => {
		getPropertyData().then((data) => {
			// Save the property data to the Redux store
			store.dispatch({ type: "SAVE_PROPERTY_DATA", payload: data });
			// When the data is finished loading turn the spinner off
			setShowSpinner(true);
		});
	}, []);

	// Handle the opening and closing of the side panel
	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};
	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
		
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={drawerOpen}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<div className={classes.container}>
					<LayerController />
				</div>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: drawerOpen,
				})}
			>
				<NavBar
					drawerOpen={drawerOpen}
					handleDrawerOpen={handleDrawerOpen}
					dashboardClasses={classes}
				/>

				<div className={classes.drawerHeader} />

				<Map showSpinner={showSpinner} />
			</main>
		</div>
	);
}
export default withStyles(styles, { withTheme: true })(Dashboard);
