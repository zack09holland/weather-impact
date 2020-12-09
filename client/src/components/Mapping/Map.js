import React, { useState, useRef, useEffect } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSupercluster from "use-supercluster";
import styles from "../../stylesheets/MapStyles/MapContainer";
import { withStyles } from "@material-ui/styles";

import CircularProgress from "@material-ui/core/CircularProgress";


function Map(props) {
	const { classes, propertyData, showSpinner, showMarkers } = props;
	const [viewport, setViewport] = useState({
		width: window.innerWidth,
		height: 'calc(100vh - 64px)',
		longitude: -74,
		latitude: 40.7,
		zoom: 3,
	});

	// Create a reference variable to be used to access the bounds of the map view
	const mapRef = useRef();

	const properties = propertyData ? propertyData.slice(0, 10000) : [];

	// Loop over the the property data to create points
	const points = properties.map((property) => ({
		type: "Feature",
		properties: {
			cluster: false,
			propertyId: property._id,
			category: property.OCCUPANCYDESC,
		},
		geometry: {
			type: "Point",
			coordinates: [
				parseFloat(property.LONGITUDE),
				parseFloat(property.LATITUDE),
			],
		},
	}));
	// Variable to get the bounds of the current map view
	const bounds = mapRef.current
		? mapRef.current.getMap().getBounds().toArray().flat()
		: null;
	// We use the JS library useSuperCluster to get very fast geospatial point clustering
	const { clusters, supercluster } = useSupercluster({
		points,
		bounds,
		zoom: viewport.zoom,
		options: { radius: 75, maxZoom: 20 },
	});

	return (
		<div>
				{!showSpinner && (
					<CircularProgress size={100} className={classes.spinner} />
				)}
			<ReactMapGL
				{...viewport}
				maxZoom={20}
				attributionControl= {false}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				onViewportChange={(newViewport) => {
					setViewport({ ...newViewport });
				}}
				ref={mapRef}
			>
				
				{showMarkers && clusters.map((cluster) => {
					const [longitude, latitude] = cluster.geometry.coordinates;
					const {
						cluster: isCluster,
						point_count: pointCount,
					} = cluster.properties;

					if (isCluster) {
						return (
							<Marker
								key={`cluster-${cluster.id}`}
								latitude={latitude}
								longitude={longitude}
							>
								<div
									className={classes.clusterMarker}
									style={{
										width: `${10 + (pointCount / points.length) * 20}px`,
										height: `${10 + (pointCount / points.length) * 20}px`,
									}}
									onClick={() => {
										const expansionZoom = Math.min(
											supercluster.getClusterExpansionZoom(cluster.id),
											20
										);

										setViewport({
											...viewport,
											latitude,
											longitude,
											zoom: expansionZoom,
											transitionInterpolator: new FlyToInterpolator({
												speed: 2,
											}),
											transitionDuration: "auto",
										});
									}}
								>
									{pointCount}
								</div>
							</Marker>
						);
					}

					return (
						<Marker
							key={`crime-${cluster.properties.crimeId}`}
							latitude={latitude}
							longitude={longitude}
						>
							<div className={classes.marker}>
								<span></span>
							</div>
						</Marker>
					);
				})}
		
			</ReactMapGL>
		</div>
	);
}
export default withStyles(styles)(Map);
