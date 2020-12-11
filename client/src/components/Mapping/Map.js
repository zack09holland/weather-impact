import ReactDOM from "react-dom";
import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useStore } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./NewMap.css";
import { withStyles } from "@material-ui/styles";
import styles from "../../stylesheets/MapStyles/MapContainer";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = (props) => {
	const mapContainerRef = useRef(null);
	const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
	// Store variable so we can access the Redux state
	const store = useStore();

	const { classes, propertyData } = props;
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

		map.on("load", () => {


		});



		// add popup when user clicks a point
		// map.on("click", "random-points-layer", (e) => {
		// 	if (e.features.length) {
		// 		const feature = e.features[0];
		// 		// create popup node
		// 		const popupNode = document.createElement("div");
		// 		ReactDOM.render(<Popup feature={feature} />, popupNode);
		// 		// set popup on map
		// 		popUpRef.current
		// 			.setLngLat(feature.geometry.coordinates)
		// 			.setDOMContent(popupNode)
		// 			.addTo(map);
		// 	}
		// });

		// clean up on unmount
		return () => map.remove();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			{!props.showSpinner && (
				<CircularProgress size={100} className={classes.spinner} />
			)}
			<div className="map-container" ref={mapContainerRef} />
		</div>
	);
};

export default withStyles(styles)(Map);
