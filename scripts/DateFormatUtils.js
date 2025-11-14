const dateFormat = {
    weekday: "long",   // Friday
    year: "numeric",   // 2025
    month: "long",     // November
    day: "numeric",    // 14
    hour: "2-digit",   // 05
    minute: "2-digit", // 30
    hour12: true       // 5:30 PM
}

export function formatIsoTimestamp(isoString) {
    var date = new Date(isoString);
    date = date.toLocaleString("en-SG", dateFormat)
    return date
}