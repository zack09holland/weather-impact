import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import '../stylesheets/Map.css'
mapboxgl.accessToken = "pk.eyJ1IjoiemFjazA5aG9sbGFuZCIsImEiOiJja2Vieml2OTkwMjd0MnFtc2RqNXRwdGs2In0.cBO-3dyUVaa1EY2nR-HTow";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lng: 5,
          lat: 34,
          zoom: 2
        };
      }
      componentDidMount() {
        const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [this.state.lng, this.state.lat],
          zoom: this.state.zoom
        });
      }
    render() { 
        return ( 
            <div>
                <button>Click me</button>
                <div ref={el => this.mapContainer = el} className='mapContainer'/>
            </div>
         );
    }
}
 
export default Map;