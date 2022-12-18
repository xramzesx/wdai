import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  location : google.maps.LatLngLiteral = {lat: 50.068146, lng: 19.912600}
}
