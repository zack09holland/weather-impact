const styles = {
	weatherInfo: {
		display: "grid",
	},
	cityName: {
		textDecoration: "underline",
		alignSelf: "center",
		justifySelf: "center",
	},
	overcast: {
		display: "grid",
		"& img, & span": {
			alignSelf: "center",
			justifySelf: "center",
		},
	},

	currentWeather: {
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		"& span": {
			alignSelf: "center",
			justifySelf: "center",
		},
	},

	temperature: {
		display: "grid",
		gridTemplateColumns: "repeat(2, 1fr)",
		"& span": {
			alignSelf: "center",
			justifySelf: "center",
		},
	},
};
export default styles;
