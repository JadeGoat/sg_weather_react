export function convertWBGTData(data) {
    const readings = data['data']['records'][0]['item']['readings']
    const location_data = readings.map(item => ({ 
                                                  id: item.station.id, 
                                                  name: item.station.name, 
                                                  label: `${item.wbgt} (${item.heatStress})`,
                                                  value: item.wbgt,
                                                  category: item.heatStress,
                                                  lat: item.location.latitude,
                                                  lon: item.location.longitude
                                                }
    ));
    const heatmap_data = readings.map(item => ([ item.location.latitude, 
                                                 item.location.longitude,
                                                 item.wbgt
                                               ]
    ));
    return { location_data, heatmap_data }
}

export function convertLightningData(data) {
    const readings = data['data']['records'][0]['item']['readings']
    const location_data = readings.map((item, index) => {
        const highLowValue = item.type == "C" ? 'Low' : 'High'
        return { 
            id: index, 
            name: item.text, 
            value: item.type,
            category: highLowValue,
            lat: item.location.latitude,
            lon: item.location.longitude
        }
    });
    const location_high_value_data = readings.map((item, index) => {
        const highLowValue = (item.type == "C") ? 'Low' :
                             (item.type == "G") ? 'High': 'Others'
        return item.type != "C" ? { 
                                    id: index, 
                                    name: item.text, 
                                    value: item.type,
                                    category: highLowValue,
                                    lat: item.location.latitude,
                                    lon: item.location.longitude
                                }: null;
    }).filter(Boolean);
    return { location_data, location_high_value_data }
}

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
        return item2_value >= 0 ? { 
                                    id: item1.id, 
                                    name: item1.name, 
                                    label: `${item2_value} ${readingUnit}`,
                                    value: item2_value,
                                    lat: item1.location.latitude, 
                                    lon: item1.location.longitude,
                                  } : null;
    });
    var heatmap_data = stations.map(item1 => {
        const item2_value = map2.get(item1.id);
        return item2_value >= 0 ? [
                               item1.location.latitude, 
                               item1.location.longitude,
                               item2_value
                             ] : null;
    });

    // Remove empty rows
    location_data = location_data.filter(Boolean)
    heatmap_data = heatmap_data.filter(Boolean)
    return { location_data, heatmap_data }
}

export function mergeWindData(windDirData, windSpeedData) {

    // Get the two list of the weather data
    const stationsWindDir = windDirData['data']['stations']
    const readingsWindDir = windDirData['data']['readings'][0]['data']
    const readingsWindSpeed = windSpeedData['data']['readings'][0]['data']
    const readingUnit = windSpeedData['data']['readingUnit']

    // Extract wind direction data from raw data
    const mapWindDir = new Map(readingsWindDir.map(item => [item.stationId, item.value]));
    var locWindDir = stationsWindDir.map(item => {
        const windDirValue = mapWindDir.get(item.id);
        return windDirValue >= 0 ? { 
                                     id: item.id, 
                                     name: item.name, 
                                     direction: windDirValue, 
                                     lat: item.location.latitude, 
                                     lon: item.location.longitude,
                                   } : null;
    }).filter(Boolean);

    // Combined wind speed using the station id as matching id
    const mapWindSpeed = new Map(readingsWindSpeed.map(item => [item.stationId, item.value]));
    const combinedWindData = locWindDir.map(item => {
        const windSpeedValue = mapWindSpeed.get(item.id);
        return windSpeedValue >= 0 ? { ...item,
                                       speed: windSpeedValue,
                                       label: `${item.direction}° @ ${windSpeedValue} ${readingUnit}`
                                     } : null;
    });
    return combinedWindData
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