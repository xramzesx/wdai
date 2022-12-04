import { Component, OnInit } from '@angular/core';
import { GlobalStateService } from '@app/services/global-state.service';
import { HttpService } from '@app/services/http.service';
import { Cart, CartItem, TripItem } from '@app/types';

type Reducer = (a: TripItem, b: TripItem) => Boolean

@Component({
  selector: 'app-trip-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  trips: TripItem[] = []  
  cart: Cart = new Map()

  cheapestId : number = 0
  costliestId: number = 0

  constructor( 
    private globalState: GlobalStateService 
  ) {}

  ngOnInit(): void {
    this.globalState.tripsChange.subscribe( data => {
      this.trips = data
      this.refresh()  
    })


    this.globalState.cartChange.subscribe( ( cart : Cart ) => {
      this.cart = cart
      this.refresh()
    })
  }


  refresh() : void {
    this.cheapestId = this.getCheapestID()
    this.costliestId = this.getCostliestID()
  }

  getSearched( comparator : Reducer ) {
    
    const filtered = this.trips.filter(({
      id, 
      quantity 
    } ) => 
      quantity - this.getReservations(id) > 0
    )

    return filtered.length ? filtered.reduce(( 
      lastResult: TripItem, 
      trip: TripItem 
    ) => comparator( lastResult, trip ) 
      ? lastResult 
      : trip 
    ) : {id: 0}
  }

  getCheapestID () {
    return this.getSearched( 
      (a:TripItem, b:TripItem) => a.price < b.price 
    )?.id
  }

  getCostliestID () : number {
    return this.getSearched( 
      (a: TripItem, b: TripItem) => a.price > b.price 
    )?.id
  }

  getReservations( id: number ) {
    const { quantity } = this.cart.get(id) ?? { quantity: 0 }
    return quantity 
  }
}
