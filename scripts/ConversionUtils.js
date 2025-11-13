

export function convertDataToLocation(data) {

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
    var formatted_data = stations.map(item1 => {
        const item2_value = map2.get(item1.id);
        return item2_value ? { id: item1.id, 
                                name: item1.name, 
                                label: `${item2_value} ${readingUnit}`, 
                                lat: item1.location['latitude'], 
                                lon: item1.location['longitude'],
                                } : null;
    });

    // Remove empty rows
    return formatted_data.filter(Boolean)
}