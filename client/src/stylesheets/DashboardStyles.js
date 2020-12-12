const styles = (theme) => ({
	root: {
		display: "flex",
		overflow: "hidden",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	
	content: {
		flexGrow: 1,
		overflow: "hidden",
		//   padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	container: {
		background: "#eaeef0",
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	
});

export default styles;
