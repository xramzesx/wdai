import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@app/services/http.service';
import { CompleteTripItem, Rate, TripDate } from '@app/types';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit{
  constructor( 
    private route: ActivatedRoute, 
    private httpService : HttpService 
  ) {}

  name : string = ""
  country: string =""
  description: string = ""
  
  price : number = 0
  quantity: number = 0
  
  images : string[] = []

  date : TripDate = {
    start : new Date(), 
    end: new Date()
  }

  rates : Rate[] = []

  ngOnInit(): void {

    this.route.queryParams.subscribe( params => {
      this.httpService.getTripDetails(params['id']).subscribe
    })

    this.route.params.pipe(
      switchMap( params => this.httpService.getTripDetails(params['id']))
    ).subscribe( (trip : CompleteTripItem ) => {
      console.log(trip)
      this.name = trip.name
      this.country = trip.country
      this.description = trip.description
      this.price = trip.price
      this.quantity = trip.quantity
      this.images = trip.images
      this.date = trip.date
    })


  }
}
