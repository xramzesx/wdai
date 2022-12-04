
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

    static getRandom(min: number, max: number) : number{
        return Math.random() * (max - min) + min;
    }

    static getUniqueRandom( min: number, max: number, usedValues: number[] ) : number {
        const used = new Set(usedValues)
        const unused = [...Array(
            max - min + 1
        ).keys()]
        .map( n => n + min )
        .filter( n => !used.has(n))

        return unused.length 
            ? unused[ 
                Math.floor( 
                    Utils.getRandom(
                        0, 
                        unused.length - 1
                    )) 
                ] 
            : 0
    }
}


console.log(Utils.getUniqueRandom(10, 20, [11, 13, 14, 16]))