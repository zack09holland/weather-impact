import shp from "shpjs";

const loadShapeFile = (url) => {
	shp(url).then((data) => {
		console.log(data);
		return data;

        // EXAMPLE of using the return GeoJSON data and adding it the map
		// Add marker data as a new GeoJSON source.
		//     map.addSource("bikeracks", {
		//         type: "geojson",
		//         data: data,
		//     });
		//     map.addLayer({
		//         id: "bikeracks",
		//         type: "circle",
		//         source: "bikeracks",
		//         paint: {
		//             'circle-color': '#11b4da',
		//             'circle-radius': 4,
		//             'circle-stroke-width': 1,
		//             'circle-stroke-color': '#fff'
		//             }
		//     });
	});
};
export default loadShapeFile;
