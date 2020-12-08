import React from 'react';
import WeatherInfoPanel from './WeatherInfoPanel'
import WeatherHistoryPanel from './WeatherHistoryPanel'


export default function WeatherPanels() {
    return (
        <section className="weather-panels">
            <WeatherInfoPanel/>
            <WeatherHistoryPanel/>
        </section>
    )
}
