import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TripItem } from '@app/types';


const config = {
  countriesUrl : './assets/countries.json',
  tripsUrl : './assets/trips.json'
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  trips = []

  constructor(private httpClient: HttpClient) {}
  
  getTrips() {
    return this.httpClient.get<TripItem[]>(config.tripsUrl)
  }

  getCountries() {
    return this.httpClient.get<string[]>(config.countriesUrl)
  }
}
