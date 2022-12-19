import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '@app/api/paths';
import { CartItem, CompleteTripItem, OrderItem, Rate, TripItem } from '@app/types';
import { environment } from 'src/environments';

const options = {
  jsons : {headers: {'Content-Type': 'application/json'} }
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  trips = []
  userId : string = '0'

  preparePath( path : string, id? : string | number ) {
    return `${
      environment.apiUrl
    }${
      path
    }${ 
      id !== null && id !== undefined
        ? '/' + id 
        : '' 
    }`
  }

  constructor(private httpClient: HttpClient) {}
  
  //// TRIPS ////

  getTrips() {
    return this.httpClient.get<TripItem[]>(this.preparePath( ApiPaths.trips ))
  }

  addTrip( trip : CompleteTripItem ) {
    return this.httpClient.post<TripItem>( 
      this.preparePath( ApiPaths.trips ), 
      JSON.stringify(trip), 
      options.jsons 
    )
  }

  deleteTrip( id : string ) {
    return this.httpClient.delete<string>(
      this.preparePath(ApiPaths.trips, id)
    )
  }

  //// TRIP DETAILS ////

  getTripDetails( id : string ) {
    return this.httpClient.get<CompleteTripItem>( this.preparePath(ApiPaths.trips, id))
  }

  //// RATES ////

  addRate( id: string, rate: Rate ) {
    return this.httpClient.post<any>( 
      this.preparePath( ApiPaths.rates, id ), 
      JSON.stringify( rate ), 
      options.jsons 
    )  
  }

  //// ORDERS ////

  addOrder(item : CartItem) {
    //// user id będziemy brali w nast labaach z autoryzacji 
    
    const order : OrderItem = {
      userId : this.userId,
      tripId : item.id,
      quantity : item.quantity
    }

    return this.httpClient.post<OrderItem>( 
      this.preparePath( ApiPaths.orders ), 
      JSON.stringify(order), 
      options.jsons 
    )
  }

  getOrders() {
    return this.httpClient.get<OrderItem[]>(
      this.preparePath(ApiPaths.orders, this.userId )
    )
  }

  //// COUNTRIES ////

  getCountries() {
    return this.httpClient.get<string[]>(this.preparePath( ApiPaths.countries ))
  }
}
