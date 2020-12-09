const styles = {
	root: {
		height: "calc(100vh - 64px)",
	},
	spinner: {
		position: "absolute",
		top: "50%",
		right: "40%",
		zIndex: "1031",
		margin: "0 auto",
	},
	marker: {
		"& span": {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			boxSizing: "border-box",
			width: "30px",
			height: "30px",
			color: "#fff",
			background: "#4D2D73",
			border: "solid 2px",
			borderRadius: "0 70% 70%",
			boxShadow: "0 0 2px #000",
			cursor: "pointer",
			transformOrigin: "0 0",
			transform: "rotateZ(-135deg)",
		},
	},
	clusterMarker: {
		width: "1em",
		height: "1em",
		padding: "1rem",
		borderRadius: "50%",
		backgroundColor: "#51D5A0",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "white",
		border: "2px solid #56C498",
		cursor: "pointer",
	},
};
export default styles;
