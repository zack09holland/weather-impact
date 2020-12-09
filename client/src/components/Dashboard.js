import React, { useState, useEffect } from "react";
import clsx from "clsx";

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

import Map from "./Mapping/Map";
import Treeview from "./LayerController/LayerController";
import getPropertyData from "../assets/APIs/api";

function Dashboard(props) {
	const { classes } = props;

	const [open, setOpen] = useState(true);
	const [propertyData, setPropertyData] = useState();
	const [showSpinner, setShowSpinner] = useState(false);
	const [showMarkers, setShowMarkers] = useState(false);

	// Get the property data from the server and set the state 
	//	-getPropertyData is called from a seperate js file
	useEffect(() => {
		getPropertyData().then((data) => {
			console.log(data);
			setPropertyData(data);
			setShowSpinner(true);
		});
	}, []);

	const handleMarkerCreation = (val) => {
		setShowMarkers(val)
	}

	// Handle the opening and closing of the side panel
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Weather Impact
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
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
					<Treeview createMarkers={handleMarkerCreation} propertyData={propertyData} />
				</div>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />

				<Map
					showMarkers = {showMarkers}
					propertyData={propertyData}
					showSpinner={showSpinner}
					panelOpen={open}
				/>
			</main>
		</div>
	);
}
export default withStyles(styles, { withTheme: true })(Dashboard);
