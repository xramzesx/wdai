import { Component, Input } from '@angular/core';
import { Rate } from '@app/types';

@Component({
  selector: 'app-offer-rates',
  templateUrl: './offer-rates.component.html',
  styleUrls: ['./offer-rates.component.scss']
})
export class OfferRatesComponent {
  @Input() rates : Rate[] = []


  packRate( rate : Rate ) {
    return [ rate ]
  }
}
