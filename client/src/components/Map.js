import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import ReactMapGL from "react-map-gl";

import styles from "../stylesheets/MapStyles/MapContainer";

class Map extends Component {
	constructor(props) {
        super(props);
        this.state = {
          style: 'mapbox://styles/mapbox/light-v9',
          viewport: {
            longitude: -74,
            latitude: 40.7,
            zoom: 11,
            maxZoom: 16
          }
        };
      }
      componentDidMount() {
        window.addEventListener('resize', this._resize);
        this._resize();
      }
      _onViewportChange = (viewport) => {
        this.setState({
          viewport: { ...this.state.viewport, ...viewport }
        });
      }
      _resize = () => {
        this._onViewportChange({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    
	render() {
		const { viewport, style } = this.state;
		const { open, classes } = this.props;
		return (
			<div className={classes.root} style={{position:"relative"}}>
				<ReactMapGL
                    {...viewport}
                    mapStyle={style}
					mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={viewport => this._onViewportChange(viewport)}
                    ></ReactMapGL>
			</div>
		);
	}
}

export default withStyles(styles)(Map);
