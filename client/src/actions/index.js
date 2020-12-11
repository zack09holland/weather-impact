export const saveZipCode = (zipCode) => {
    return {
        type: "SAVE_ZIP",
        payload: zipCode
    }
}
// Save the weather data
export const saveWeatherData = (data) => {
    return {
        type: "SAVE_WEATHER_DATA",
        payload: data
    }
}
// Save the temperature
export const saveTemperature = (data) => {
    return {
        type: "SAVE_TEMPERATURE",
        payload: data
    }
}
// Update the history for the searched weather locations
export const updateHistory = (data) => {
    return {
        type: "UPDATE_HISTORY",
        payload: data
    }
}
// Used to save the mapBox map itself to state
export const saveMap = (data) => {
    return {
        type: "SAVE_MAP",
        payload: data
    }
}
// Save the property data to the store so that it can be used elsewhere
export const savePropertyData = (data) => {
    return {
        type: "SAVE_PROPERTY_DATA",
        payload: data
    }
}