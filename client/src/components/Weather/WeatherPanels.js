import React from 'react';
import WeatherInfoPanel from './WeatherInfoPanel'
import WeatherHistoryPanel from './WeatherHistoryPanel'
import {withStyles} from '@material-ui/styles'
import styles from '../../stylesheets/WeatherStyles/WeatherPanels'

function WeatherPanels(props) {
    const {classes} = props
    return (
        <section className={classes.weatherPanels}>
            <WeatherInfoPanel/>
            <WeatherHistoryPanel/>
        </section>
    )
}
export default withStyles(styles) (WeatherPanels);
