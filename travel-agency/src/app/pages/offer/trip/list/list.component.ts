import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '@app/pipes/filter.pipe';
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
  @Input() filters: any = {};
  
  trips: TripItem[] = []  
  cart: Cart = new Map()


  constructor( 
    private globalState: GlobalStateService,
    private filterPipe: FilterPipe 
  ) {}

  ngOnInit(): void {
    this.trips = this.globalState.trips
    this.cart = this.globalState.cart

    this.globalState.tripsChange.subscribe( data => {
      this.trips = data
      this.refresh()  
    })

    console.log('siema')
    this.globalState.cartChange.subscribe( ( cart : Cart ) => {
      this.cart = cart
      this.refresh()
    })
  }

  refresh() : void {
    // this.cheapestId = this.getCheapestID()
    // this.costliestId = this.getCostliestID()
  }

  getSearched( comparator : Reducer ) {
    
    const prefiltered = this.filterPipe.transform( this.trips, this.filters )
    
    const filtered = prefiltered.filter(({
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

  get cheapestId () {
    return this.getCheapestID()
  }

  get costliestId() {
    return this.getCostliestID()
  }
}
