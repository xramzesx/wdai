import { Injectable } from '@angular/core';
import { Cart, CartItem, CompleteTripItem, currencies, Currency, TripItem } from '@app/types';
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
    
    //// HTTP REQUESTS ////

    this.httpService.getTrips().subscribe( (trips: TripItem[]) => {
      this.tripsChange.next(trips)
    })
  }


  //// TRIPS ////

  trips: TripItem[] = []
  tripsChange : Subject<TripItem[]> = new Subject<TripItem[]>()

  removeTrip ( id: string ) {
    /// TODO: Http request to remove trip
    
    this.httpService.deleteTrip( id ).subscribe( () => {
      this.tripsChange.next( this.trips.filter( trip => trip.id != id ))      
    })

  }

  addTrip ( trip: CompleteTripItem ) {
    this.httpService.addTrip(trip).subscribe( tripItem => {
      this.trips.push(tripItem)
      this.tripsChange.next( this.trips )
    })    
  }

  modifyRate( tripId : string, rate: number ) {
    /// TODO: Backend operations for this 

    const trip = this.trips.find( ({id}) => tripId == id )
    const rateItem = trip?.rates?.find( ({id}) => id == this.userId )
    console.log(trip)

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

  getUserRate( tripId : string ) {
    const trip = this.trips.find( ({id}) => tripId == id )
    const rateItem = trip?.rates?.find( ({id}) => id == this.userId )
    return rateItem ? rateItem.rate : 0
  }


  //// CART LOGIC ////


  cart : Cart = new Map()
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
