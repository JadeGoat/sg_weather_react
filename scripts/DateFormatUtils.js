const dateFormat = {
    weekday: "long",   // Friday
    year: "numeric",   // 2025
    month: "long",     // November
    day: "numeric",    // 14
    hour: "2-digit",   // 05
    minute: "2-digit", // 30
    hour12: true       // 5:30 PM
}

const dateShortFormat = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
}

export function formatIsoTimestamp(isoString, longFormat=true) {
    var date = new Date(isoString);
    if (longFormat) {
        date = date.toLocaleString("en-SG", dateFormat)
    }
    else {
        date = date.toLocaleString("en-SG", dateShortFormat)
    }
    return date
}

export function addDay(date, days) {
    // Copy so that original is not modified
    var tempDate = new Date(date); 
    // Add to current and format to short timestamp
    var newDate = tempDate.setDate(tempDate.getDate() + days)
    newDate = formatIsoTimestamp(newDate, false)
    return newDate
}

export function addMonth(date, months) {
    // Copy so that original is not modified
    var tempDate = new Date(date);
    // Add to current and format to short timestamp
    var newDate = tempDate.setMonth(tempDate.getMonth() + months)
    newDate = formatIsoTimestamp(newDate, false)
    return newDate
}

export function addYear(date, years) {
    // Copy so that original is not modified
    var tempDate = new Date(date);
    // Add to current and format to short timestamp
    var newDate = tempDate.setFullYear(tempDate.getFullYear() + years)
    newDate = formatIsoTimestamp(newDate, false)
    return newDate
}