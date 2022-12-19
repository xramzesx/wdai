import { OrderStatus, Rate } from '@app/types';

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

    static  unique( arr: any[] ) : any[] {
        return Array.from( new Set( arr ))
    }    

    static parseDate(date: Date) : string {
        return date ? date.toISOString().split('T')[0] : ''
    }

    static getRate( rates: Rate[] ) : number {
        return rates.length == 0
            ? 0
            : Math.round(rates.reduce( (acc, {rate}) => acc + rate, 0 ) / rates.length )
    }

    static cmpDate( first:string, second:string ) : number {
        const firstDate = new Date(first)
        const secondDate = new Date(second)

        return firstDate.getTime() - secondDate.getTime()
    }

    static removeItem<T>(arr: Array<T>, value: T): Array<T> { 
        const index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
    }

    static getStatus( startDate : Date, endDate : Date ) : OrderStatus {
        if ( new Date(startDate).getTime() > (new Date()).getTime() )
            return OrderStatus.Waiting
        if ( new Date(endDate).getTime() < (new Date()).getTime() )
            return OrderStatus.Archive
        return OrderStatus.Active   
    }
}

