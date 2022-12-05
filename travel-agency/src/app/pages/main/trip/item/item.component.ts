import { Component, Input, HostBinding } from '@angular/core';
import { Rate, TripDate } from '@app/types';
import { QuantityMaskPipe } from '@app/pipes/quantity.pipe';
import { GlobalStateService } from '@app/services/global-state.service';

@Component({
  selector: 'app-trip-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  constructor( 
    private globalState: GlobalStateService,
    private quantityPipe : QuantityMaskPipe 
  ) {}

  //// INPUTS ////

  @Input() id: number = 0;

  @Input() name : string = "";
  @Input() country: string = ""

  @Input() date: TripDate = {start: new Date(0), end: new Date(0)}
  @Input() quantity: number = 0;
  @Input() price: number = 0;
  
  @Input() description: string = "";
  @Input() image: string = "";
  @Input() reservations = 0;

  @Input() rates : Rate[] = [];

  //// HOST BINDS ////

  @HostBinding('class.disabled')
  @Input() disabled: boolean = false;

  @HostBinding('class.cheapest')
  @Input() cheapest: boolean = false;

  @HostBinding('class.costliest')
  @Input() costliest: boolean = false;

  selected: number = 0;

  //// EVENT HANDLERS ////
  
  onAddUnit() {
    if ( this.quantity >= this.selected) {
      this.selected++
    }
    this.modifyCart()
  }

  onRemoveUnit() {
    if (this.selected > 0) {
      this.selected--
    }
    this.modifyCart()
  }

  modifyCart(){
    this.globalState.modifyCart({
      id: this.id,
      name : this.name,
      quantity : this.selected,
      price: this.price
    })
  }

  onRemoveTrip () {
    this.globalState.removeTrip( this.id )
  }

  //// QUANTITY HANDLER ////

  getAvailableClassVariant () : string {
    return this.quantityPipe.transform( 
      this.quantity - this.selected, 
      'className' 
    );
  }
}