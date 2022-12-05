import { Injectable } from '@angular/core';
import { Cart, CartItem, currencies, Currency, TripItem } from '@app/types';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import Utils from '@app/utils';


@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  // This service contains all global state //

  //// CURRENCY PIPES ////
  
  currency : Currency = currencies[0];
  currencyChange : Subject<Currency> = new Subject<Currency>()

  onCurrencyChange ( index: number ) {
    this.currencyChange.next( currencies[index] )
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
      id : Utils.getUniqueRandom(
        0, 
        100, 
        this.trips.map( ({id}) => id )
    )}
    
    console.log('item',tripItem)
    this.trips.push(tripItem)
    this.tripsChange.next( this.trips )
  }



  //// CART ////

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

  removeFromCart (item: CartItem) : void {
    
  } 
}
