
const months = [
    "styczeń",
    "luty",
    "marzec",
    "kwiecień",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpień",
    "wrzesień",
    "październik",
    "listopad",
    "grudzień"
]

export default class Utils {
    static convertDate(date : Date) : string {
        return `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }
    
    static httpUrlRegex = /^\s*https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)\s*$/
}
