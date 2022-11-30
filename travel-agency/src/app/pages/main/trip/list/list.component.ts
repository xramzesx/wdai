import { Component, OnInit } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { TripItem } from '@app/types';

@Component({
  selector: 'app-trip-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  trips: TripItem[] = []  

  constructor( private httpService: HttpService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.httpService.getTrips().subscribe( data => {
      this.trips = data
      console.log(data)
    })
  }
}
