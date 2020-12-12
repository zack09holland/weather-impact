import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

// Mapbox Components
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// Material UI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FolderIcon from "@material-ui/icons/Folder";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";

// Styling Imports
import { withStyles } from "@material-ui/styles";
import styles from "../stylesheets/NavBarStyles";
import clsx from "clsx";

class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	componentDidMount() {
		this.addGeoCoder();
	}
	// Creates and adds the geocoder to the map
	addGeoCoder = () => {
		const geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl,
		});

		geocoder.addTo("#geocoder");
	};

	render() {
		const {
			classes,
			handleDrawerOpen,
			dashboardClasses,
			drawerOpen,
		} = this.props;

		return (
			<div>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(dashboardClasses.appBar, classes.root, {
						[dashboardClasses.appBarShift]: drawerOpen,
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(
								dashboardClasses.menuButton,
								drawerOpen && dashboardClasses.hide
							)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Weather Impact
						</Typography>
						<Button color="inherit">Login</Button>
					</Toolbar>

					<Divider />

					<div className={classes.searchBar}>
						<div id="geocoder" className={classes.geocoder}></div>
						<ButtonGroup
							variant="text"
							color="primary"
							aria-label="text primary button group"
						>
							<Button>
								<BookmarksIcon />
							</Button>
							<Button>
								<EqualizerIcon />
							</Button>
							<Button>
								<FolderIcon />
							</Button>
						</ButtonGroup>
					</div>
				</AppBar>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		map: state.map,
	};
};
export default compose(connect(mapStateToProps), withStyles(styles))(NavBar);
