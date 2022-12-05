import { Injectable } from '@angular/core';
import { Cart, CartItem, currencies, Currency, TripItem } from '@app/types';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import Utils from '@app/utils';


@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  /// temporary userId ///
  userId : number = 0

  // This service contains all global state //

  //// CURRENCY PIPES ////
  
  currency : Currency = currencies[0];
  currencyChange : Subject<Currency> = new Subject<Currency>()

  onCurrencyChange ( index: number ) {
    this.currencyChange.next( currencies[index] )
  } 

  convertToCurrency( value : number ) {
    return Math.round( value / this.currency.converter * 100 ) / 100
  }

  //// INJECTIONS ////
  
  constructor(private httpService: HttpService) { 
    this.currencyChange.subscribe( 
      (value: Currency) => { 
        this.currency = value 
      } 
    )
    
    this.tripsChange.subscribe( (trips: TripItem[]) => {
      this.trips = trips
    })

    this.cartChange.subscribe(
      (value: Cart) => {
        this.cart = value
      }
    )
    
    this.hideCartChange.subscribe( (hideCart : boolean) => {
      this.hideCart = hideCart
    } )

    //// HTTP REQUESTS ////

    this.httpService.getTrips().subscribe( (trips: TripItem[]) => {
      this.tripsChange.next(trips)
    })
  }


  //// TRIPS ////

  trips: TripItem[] = []
  tripsChange : Subject<TripItem[]> = new Subject<TripItem[]>()

  removeTrip ( id:number ) {
    /// TODO: Http request to remove trip
    console.log(id)
    this.tripsChange.next( this.trips.filter( trip => trip.id != id ))
  }

  addTrip ( trip: TripItem ) {
    /// TODO: Http request to add trip

    const tripItem : TripItem = { 
      ...trip,
      price : Math.round( trip.price * this.currency.converter * 100) / 100,
      id : Utils.getUniqueRandom(
        0, 
        100, 
        this.trips.map( ({id}) => id )
    )}
    
    this.trips.push(tripItem)
    this.tripsChange.next( this.trips )
  }

  modifyRate( tripId : number, rate: number ) {
    /// TODO: Backend operations for this 

    const trip = this.trips.find( ({id}) => tripId == id )
    const rateItem = trip?.rates?.find( ({id}) => id == this.userId )

    if ( rateItem === undefined ) {
      trip?.rates?.push({id : this.userId, rate})
      return
    } 
  
    if ( rateItem.rate == rate ) {
      Utils.removeItem( trip?.rates || [], rateItem )
    } else {
      rateItem.rate = rate;
    }
  
  }

  getUserRate( tripId : number ) {
    const trip = this.trips.find( ({id}) => tripId == id )
    const rateItem = trip?.rates?.find( ({id}) => id == this.userId )
    return rateItem ? rateItem.rate : 0
  }
  //// CART ////

  hideCart : boolean = true
  hideCartChange: Subject<boolean> = new Subject<boolean>()

  toggleCart(){
    console.log('elo', this.hideCart)
    this.hideCartChange.next(!this.hideCart)
  }

  cart : Map<number, CartItem> = new Map()
  cartChange : Subject< Cart > = 
    new Subject< Cart >()

  modifyCart (item : CartItem) : void {
    if ( item.quantity == 0 ) {
      this.cart.delete(item.id)
      this.cartChange.next(this.cart)
      return;
    }
    
    if ( this.cart.has(item.id) ){
        const current : any = this.cart.get(item.id)
        this.cart.set(item.id, { ...current, quantity : item.quantity })
      } else {
        this.cart.set(item.id, item)
      }
      
    this.cartChange.next(this.cart)
  }
}
