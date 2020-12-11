const removeLayer = (map,layerId) => {
    // We first remove the layer
    map.removeLayer(layerId)
    // Then remove the source
    map.removeSource(layerId);


}

export default removeLayer;