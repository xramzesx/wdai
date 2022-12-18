import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '@app/api/paths';
import { CompleteTripItem, TripItem } from '@app/types';
import { environment } from 'src/environments';

const options = {
  jsons : {headers: {'Content-Type': 'application/json'} }
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  trips = []

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

  getCountries() {
    return this.httpClient.get<string[]>(this.preparePath( ApiPaths.countries ))
  }
}
