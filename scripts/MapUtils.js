import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { icon, divIcon } from 'leaflet';


export function createDivIcon(iconColor, iconWidth, iconHeight) {
    const icon = divIcon({
        className: 'custom-icon',
        html: `<img src="../images/marker-icon${iconColor}.png" width="${iconWidth}" height="${iconHeight}" />`,
        iconSize: [iconWidth, iconHeight],
        iconAnchor: [iconWidth / 2, iconHeight / 2]
    })
    return icon
}

function createIcon(iconDesc, multiplier = 1) {
    return icon({
        iconUrl: '../images/marker-icon' + iconDesc + '.png',
        shadowUrl: '../images/marker-shadow.png',
        iconSize: [25* multiplier, 41 * multiplier],
        iconAnchor: [12* multiplier, 41 * multiplier],
        popupAnchor: [1* multiplier, -34 * multiplier],
        shadowSize: [41* multiplier, 41 * multiplier]
    }); 
}

export function getIcons(multiplier = 1) {

    const redIcon = createIcon("-red", multiplier);
    const redIconWithDollar = createIcon("-red-dollar", multiplier);
    const greenIcon = createIcon("-green", multiplier);
    const greenIconWithDollar = createIcon("-green-dollar", multiplier);
    const orangeIcon = createIcon("-orange", multiplier);
    const defaultIcon = createIcon("", multiplier);

    return { redIcon, redIconWithDollar, greenIcon, greenIconWithDollar, orangeIcon, defaultIcon };
}

export function createLegend(iconColorList, iconDescList) {
    
    // Create the section content
    let sectionContent = ""
    const minLength = Math.min(iconColorList.length, iconDescList.length);
    for (let i = 0; i < minLength; i++) {
        sectionContent += `<div>
                                <img src="../images/marker-icon${iconColorList[i]}.png"/>
                                <i>${iconDescList[i]}</i>
                            </div>`
    }

    // Create the html legend
    const legendHtml = `
        <p><b>Pin Legend</b></p>
        <section>
            ${sectionContent}
        <section>
      `
    return legendHtml
}

export function RecenterMap({ center }) {
    const map = useMap();
    
    useEffect(() => {
        if (center) {
        map.flyTo(center, map.getZoom());
        }
    }, [center, map]);

    return null;
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}