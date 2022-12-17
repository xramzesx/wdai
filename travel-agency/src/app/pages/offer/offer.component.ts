import { Component, OnInit } from '@angular/core';
import { TripItem } from '@app/types';
import { HttpService } from '@app/services/http.service';


@Component({
  selector: 'app-main',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit{
  constructor( private httpService: HttpService ) {}

  filters : any = {}
  
  handleFilters( filters:any ) {
    this.filters = filters
  }

  trips: TripItem[] = []

  ngOnInit(): void {
      
  }
} 
