
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
}