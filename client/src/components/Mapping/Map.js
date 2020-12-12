import React, { useRef, useState, useEffect } from "react";

import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { useStore } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/styles";
import styles from "../../stylesheets/MapStyles/MapContainer";
import clsx from "clsx";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = (props) => {
	const mapContainerRef = useRef(null);
	const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
	// Store variable so we can access the Redux state
	const store = useStore();

	const { classes, propertyData, dataPanel, layerPanel } = props;
	// initialize map when component mounts
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			// See style options here: https://docs.mapbox.com/api/maps/#styles
			style: "mapbox://styles/mapbox/streets-v11",
			center: [-103.59179687498357, 40.66995747013945],
			zoom: 3,
		});
		// Save the map object to the REDUX store
		store.dispatch({ type: "SAVE_MAP", payload: map });

		// add navigation control (zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

		map.on("load", () => {});

		// clean up on unmount
		return () => map.remove();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			{props.showSpinner && (
				<CircularProgress size={100} className={classes.spinner} />
			)}

			{/* <div className={classes.mapContainer} ref={mapContainerRef} /> */}
			<div
				className={clsx(classes.mapContainer, {
					[classes.contentShiftLeft]: dataPanel,
					[classes.contentShiftRight] : layerPanel
				})}
				ref={mapContainerRef}
			/>
		</div>
	);
};

export default withStyles(styles)(Map);
