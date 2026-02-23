export function DateToTimeOnly(strDate) {
    let date = new Date(strDate)
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
}