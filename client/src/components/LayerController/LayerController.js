import React, { Component } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/core/styles";
import styles from "../../stylesheets/LayerControllerStyles/LayerController";
import { compose } from "redux";
import { connect } from "react-redux";
import {addLocationLayer, removeLocationLayer} from '../../assets/mapScripts/handleLocations'
const url = 'shp/BikeRacks.zip'

class LayerController extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// Handle the creation of the markers, when the location checkbox is clicked
	// we will set the state in the parent component so that the points will be
	// created
	handleLocations = (event) => {
		const checked = event.target.checked;

		if(checked){
			addLocationLayer(this.props.propertyData, this.props.map)
		}
		else{
			removeLocationLayer(this.props.map)
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
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
									onChange={this.handleLocations}
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
							The focus event of the nested action will propagate up and also
							focus the accordion unless you explicitly stop it.
						</Typography>
					</AccordionDetails>
				</Accordion>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		map: state.map,
		propertyData: state.propertyData,
	};
};
export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(LayerController);
