import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import styles from "../../stylesheets/LayerPanelStyles/LayerPanel";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
	addLocationLayer,
	removeLocationLayer,
} from "../../assets/mapScripts/handleLocations";


function LayerPanel(props) {
	const { classes, toggleLayerPanel, layerPanel } = props;
	// Handle the creation of the markers, when the location checkbox is clicked
// we will set the state in the parent component so that the points will be
// created
const handleLocations = (event) => {
	const checked = event.target.checked;

	if (checked) {
		addLocationLayer(props.propertyData, props.map);
	} else {
		removeLocationLayer(props.map);
	}
};
	return (
		<div className={classes.root}>
			<CssBaseline />
			{layerPanel ? (
				<div>
					<Drawer
						className={classes.drawer}
						variant="permanent"
						anchor="left"
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						<div className={classes.drawerContainer}>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-label="Expand"
									aria-controls="additional-actions1-content"
									id="additional-actions1-header"
								>
									<FormControlLabel
										aria-label="Acknowledge"
										onClick={(event) => event.stopPropagation()}
										onFocus={(event) => event.stopPropagation()}
										control={
											<Checkbox
												value="locations"
												color="primary"
												size="small"
												onChange={handleLocations}
											/>
										}
										label="Locations"
									/>
								</AccordionSummary>
								<AccordionDetails>
									<Typography color="textSecondary">
										This toggles the property locations
									</Typography>
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-label="Expand"
									aria-controls="additional-actions2-content"
									id="additional-actions2-header"
								>
									<FormControlLabel
										aria-label="Acknowledge"
										onClick={(event) => event.stopPropagation()}
										onFocus={(event) => event.stopPropagation()}
										control={<Checkbox color="primary" size="small" />}
										label="Layers"
									/>
								</AccordionSummary>
								<AccordionDetails>
									<Typography color="textSecondary">
										The focus event of the nested action will propagate up and
										also focus the accordion unless you explicitly stop it.
									</Typography>
								</AccordionDetails>
							</Accordion>
						</div>
					</Drawer>
					<div
						className={clsx(classes.chevronBtn, {
							[classes.shiftBtn]: layerPanel,
						})}
					>
						<button onClick={toggleLayerPanel}>
							<ChevronLeftIcon />
						</button>
					</div>
				</div>
			) : (
				<div
					className={clsx(classes.chevronBtn, {
						[classes.shiftBtn]: layerPanel,
					})}
				>
					<button onClick={toggleLayerPanel}>
						<ChevronRightIcon />
					</button>
				</div>
			)}
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		map: state.map,
		propertyData : state.propertyData
	};
};
export default compose(connect(mapStateToProps), withStyles(styles))(LayerPanel);


