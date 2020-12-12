const drawerWidth = 250;

const styles = (theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		zIndex: "2",
	},
	drawerContainer: {
		marginTop: "120px",
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	chevronBtn: {
		position: "absolute",
		zIndex: "5",
		top: "50%",
		left: "0",
		"& button": {
			padding: "1em .1em",
			outline: "none",
			border: "none",
			background: "#333",
			color: "white",
		},
	},
	shiftBtn: {
		marginLeft: drawerWidth,
	},
});
export default styles;
