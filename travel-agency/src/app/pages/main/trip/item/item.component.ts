import { Component, Input } from '@angular/core';
import { TripDate } from '@app/types';
import Utils from '@app/utils';

@Component({
  selector: 'app-trip-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() name : string = "";
  @Input() country: string = ""

  @Input() date: TripDate = {start: new Date(0), end: new Date(0)}
  @Input() quantity: number = 0;
  @Input() price: number = 0;
  
  @Input() description: string = "";
  @Input() image: string = "";

  /// TODO: Dorobić pipe do currency
  currency:string = "PLN"

  selected: number = 0;
}