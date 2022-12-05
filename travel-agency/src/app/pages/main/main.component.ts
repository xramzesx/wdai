import { Component, OnInit } from '@angular/core';
import { TripItem } from '@app/types';
import { HttpService } from '@app/services/http.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  constructor( private httpService: HttpService ) {}

  filters : any = {}
  
  handleFilters( filters:any ) {
    this.filters = filters
  }

  trips: TripItem[] = []

  ngOnInit(): void {
      
  }
} 
