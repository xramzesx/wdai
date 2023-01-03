import { Component, Input, HostBinding } from '@angular/core';
import { Rate, TripDate, UserRole } from '@app/types';
import { QuantityMaskPipe } from '@app/pipes/quantity.pipe';
import { GlobalStateService } from '@app/services/global-state.service';
import { Router } from '@angular/router';
import { TokenService } from '@app/services/token.service';

@Component({
  selector: 'app-trip-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  constructor( 
    private globalState: GlobalStateService,
    private tokenService : TokenService,
    private quantityPipe : QuantityMaskPipe,
    private router: Router
  ) {}

  //// INPUTS ////

  @Input() id: string = '';

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

  @Input() selected: number = 0;

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

  routeToDetails() {
    this.router.navigate([`/offer/${this.id}`])
  }

  //// QUANTITY HANDLER ////

  getAvailableClassVariant () : string {
    return this.quantityPipe.transform( 
      this.quantity - this.selected, 
      'className' 
    );
  }

  //// GETTERS ////

  get path() {
    return `/offer/${this.id}`
  }

  get isNotAnon() {
    return this.tokenService.user.role !== UserRole.anon
  }

  get isAdmin() {
    return this.tokenService.user.role === UserRole.admin || this.tokenService.user.role === UserRole.manager 
  }
}