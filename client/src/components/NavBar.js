import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from "@material-ui/core/CssBaseline";

import { withStyles } from "@material-ui/styles";
import styles from "../stylesheets/NavBarStyles";
import clsx from "clsx";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { classes, handleDrawerOpen, dashboardClasses, drawerOpen } = this.props;
		return (
			<div >
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(dashboardClasses.appBar,classes.root,{
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
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles) (NavBar);
