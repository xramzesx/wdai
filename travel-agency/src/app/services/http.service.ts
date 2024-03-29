import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '@app/api/paths';
import { 
  CartItem, 
  CompleteTripItem, 
  LoginProps, 
  OrderItem, 
  Rate, 
  RegisterProps, 
  Tokens, 
  TripItem, 
  UserProps
} from '@app/types';
import { environment } from 'src/environments';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

const options = {
  jsons : { headers: {'Content-Type': 'application/json'} },
  auth : { headers: {'Content-Type': 'application/json'},  withCredentials: true }
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

  accessToken : string = ''
  refreshToken : string = ''

  constructor(
    private httpClient: HttpClient,
    private tokenService : TokenService
  ) {}
  
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
      this.preparePath( ApiPaths.orders )
    )
  }

  //// COUNTRIES ////

  getCountries() {
    return this.httpClient.get<string[]>(this.preparePath( ApiPaths.countries ))
  }

  //// AUTH ////

  login( props : LoginProps ) {
    console.log(props)
    return this.httpClient.post<any>( 
      this.preparePath( ApiPaths.login ), 
      JSON.stringify(props), 
      options.auth 
    )
  }

  register( props : RegisterProps ) {
    return this.httpClient.post<Tokens>(
      this.preparePath( ApiPaths.register ), 
      JSON.stringify( props ), 
      options.auth 
    )
  }

  logout() {
    return this.httpClient.get(
      this.preparePath(ApiPaths.logout)
    )
  }

  refresh() {
    return this.httpClient.get<Tokens>(
      this.preparePath( ApiPaths.refreshToken )
    )
  }

  //// USERS ////

  getUsers() {
    return this.httpClient.get<UserProps[]>(
      this.preparePath(ApiPaths.users)
    )
  }
}
