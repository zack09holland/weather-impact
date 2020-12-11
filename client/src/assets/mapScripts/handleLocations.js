import mapboxgl from "mapbox-gl";
import geojson from "geojson";

/**
 * @summary Handles the adding and removing of the property location data
 * 
 * @function addLocationLayer
 * @param {Object} propertyData - JSON array of the data pulled from the server
 * @param {Object} map - reference to the map so we have access to it
 * 
 */

/**
 * @function removeLocationLayer
 * @param {Object} map - reference to the map so we have access to it
 * @returns Removes the layers created for the clustered and unclustered points
 *          as well as removes the datasource 
 * 
 */
export function addLocationLayer(propertyData, map) {
    // Variable to manage the size of the property data for testing purposes    
	const properties = propertyData ? propertyData.slice(0, 1000) : [];

	// Convert Property Data to GeoJSON
	const propertyDataAsGeoJSON = geojson.parse(properties, {
		Point: ["LATITUDE", "LONGITUDE"],
	});

	map.addSource("property-locations", {
		type: "geojson",
		// Point to the geojson data we created
		data: propertyDataAsGeoJSON,
		cluster: true,
		clusterMaxZoom: 14, // Max zoom to cluster points on
		clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    });
    
    // Add a layer for clustered points
	map.addLayer({
		id: "clusters",
		type: "circle",
		source: "property-locations",
		filter: ["has", "point_count"],
		paint: {
			// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
			// with three steps to implement three types of circles:
			//   * Blue, 20px circles when point count is less than 100
			//   * Yellow, 30px circles when point count is between 100 and 750
			//   * Pink, 40px circles when point count is greater than or equal to 750
			"circle-color": [
				"step",
				["get", "point_count"],
				"#51bbd6",
				100,
				"#f1f075",
				750,
				"#f28cb1",
			],
			"circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
		},
	});
    // Add a layer for the counts to be displayed in each cluster
	map.addLayer({
		id: "cluster-count",
		type: "symbol",
		source: "property-locations",
		filter: ["has", "point_count"],
		layout: {
			"text-field": "{point_count_abbreviated}",
			"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
			"text-size": 12,
		},
	});
    // Add a layer for unclustered points
	map.addLayer({
		id: "unclustered-point",
		type: "circle",
		source: "property-locations",
		filter: ["!", ["has", "point_count"]],
		paint: {
			"circle-color": "#11b4da",
			"circle-radius": 4,
			"circle-stroke-width": 1,
			"circle-stroke-color": "#fff",
		},
	});
	// inspect a cluster on click
	map.on("click", "clusters", (e) => {
		var features = map.queryRenderedFeatures(e.point, {
			layers: ["clusters"],
		});
		var clusterId = features[0].properties.cluster_id;
		map
			.getSource("property-locations")
			.getClusterExpansionZoom(clusterId, (err, zoom) => {
				if (err) return;

				map.easeTo({
					center: features[0].geometry.coordinates,
					zoom: zoom,
				});
			});
	});

	// When a click event occurs on a feature in
	// the unclustered-point layer, open a popup at
	// the location of the feature, with
	// description HTML from its properties.
	map.on("click", "unclustered-point", (e) => {
		var coordinates = e.features[0].geometry.coordinates.slice();
		var mag = e.features[0].properties.mag;
		var tsunami;

		if (e.features[0].properties.tsunami === 1) {
			tsunami = "yes";
		} else {
			tsunami = "no";
		}

		// Ensure that if the map is zoomed out such that
		// multiple copies of the feature are visible, the
		// popup appears over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}
        // Add a popup for each of the points
		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML("magnitude: " + mag + "<br>Was there a tsunami?: " + tsunami)
			.addTo(map);
	});
	// Add a mouse event for clusters
	map.on("mouseenter", "clusters", () => {
		map.getCanvas().style.cursor = "pointer";
	});
	map.on("mouseleave", "clusters", () => {
		map.getCanvas().style.cursor = "";
	});
	// Add a mouse event for unclustered points
	map.on("mouseenter", "unclustered-point", () => {
		map.getCanvas().style.cursor = "pointer";
	});
	map.on("mouseleave", "unclustered-point", () => {
		map.getCanvas().style.cursor = "";
	});
}

export function removeLocationLayer(map) {
	map.removeLayer("clusters");
	map.removeLayer("cluster-count");
	map.removeLayer("unclustered-point");
	map.removeSource("property-locations");
}

export default { addLocationLayer, removeLocationLayer };
