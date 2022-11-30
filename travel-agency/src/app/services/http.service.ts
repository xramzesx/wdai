import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TripItem } from '@app/types';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  dataUrl = "./assets/trips.json"

  trips = []

  constructor(private httpClient: HttpClient) {}
  
  getTrips() {
    return this.httpClient.get<TripItem[]>(this.dataUrl)
  }
}
