const monthsShort = {
    "1": "Jan",
    "2": "Feb",
    "3": "Mar",
    "4": "Apr",
    "5": "May",
    "6": "Jun",
    "7": "Jul",
    "8": "Aug",
    "9": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
}

const monthsFull = {
    "1": "January",
    "2": "Febraury",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December"
}

export const getFormattedDate = (date) => {
    const raw = new Date(date);
    return `${raw.getDate()} ${monthsShort[raw.getMonth() + 1]}, ${raw.getFullYear()}`
}

export const getFormattedDateFull = (date) => {
    const raw = new Date(date);
    return `${raw.getDate()} ${monthsFull[raw.getMonth() + 1]}, ${raw.getFullYear()}`
}