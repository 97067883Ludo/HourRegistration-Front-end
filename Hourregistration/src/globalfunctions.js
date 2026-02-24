export function DateToTimeOnly(strDate) {
    let date = new Date(strDate)
    if (isNaN(date.getTime())) {
        return "";
    }
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
}