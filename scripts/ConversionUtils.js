

export function convertWeatherData(data) {

    // Get the two list of the weather data
    const stations = data['data']['stations']
    const readings = data['data']['readings'][0]['data']

    // Convert reading unit to shorter form
    var readingUnit = data['data']['readingUnit']
    if (readingUnit == "percentage") {
        readingUnit = "%"
    }
    else if (readingUnit == "deg C") {
        readingUnit = "°C"
    }
    else if (readingUnit == "degrees") {
        readingUnit = "°"
    }

    // Combine the two list using the stationId and reading's id
    const map2 = new Map(readings.map(item => [item.stationId, item.value]));
    var location_data = stations.map(item1 => {
        const item2_value = map2.get(item1.id);
        return item2_value >= 0 ? { id: item1.id, 
                                name: item1.name, 
                                label: `${item2_value} ${readingUnit}`, 
                                lat: item1.location['latitude'], 
                                lon: item1.location['longitude'],
                              } : null;
    });
    var heatmap_data = stations.map(item1 => {
        const item2_value = map2.get(item1.id);
        return item2_value >= 0 ? [
                               item1.location['latitude'], 
                               item1.location['longitude'],
                               item2_value
                             ] : null;
    });
    console.log(location_data)

    // Remove empty rows
    location_data = location_data.filter(Boolean)
    heatmap_data = heatmap_data.filter(Boolean)
    return { location_data, heatmap_data }
}

export function normalizeToRange(heatmapValues, minRange = 0.5, maxRange = 1) {
    const zValues = Object.values(heatmapValues).map(([, , z]) => z);
    const min = Math.min(...zValues);
    const max = Math.max(...zValues);

    // Normalize only z
    const normalized = heatmapValues.map(row => {
        const norm = minRange + (row[2] - min) / (max - min) * (maxRange - minRange);
        return [row[0], row[1], norm];
    });

    return normalized
  }