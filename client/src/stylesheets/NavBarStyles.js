const styles = (theme) => ({
	root: {
		background: "#272c34",
		color: "#fff",
		display: "flex",

		height: "64px",
	},
	searchBar: {
		background: "#eaeef0",
		height: "64px",
		boxShadow: "0 4px 2px -2px gray",
		color: "#333",
		padding: "10px",
		display: "flex",
		flexDirection: 'row',
		justifyContent: "space-between"

	},
	menuButton: {
		marginRight: "2em",
	},
	title: {
		flexGrow: 1,
	},
	geocoder: {
		zIndex: 1,
		textAlign: "center",
		
		
	},
});
export default styles;
