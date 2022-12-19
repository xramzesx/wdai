import { Component } from '@angular/core';
import { GlobalStateService } from '@app/services/global-state.service';
import { CartItem } from '@app/types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(
    private globalState : GlobalStateService
  ) {}

  get items() : CartItem[] {
    return Array.from( this.globalState.cart , ([name, value]) => value)
  }

  get totalValue () {
    return this.items.reduce( (acc, {price, quantity}) => acc + price * quantity * 100, 0) / 100
  }

  getPath( item : CartItem ) {
    return `/offer/${item.id}`
  }

  orderTrip ( item : CartItem ) {
    this.globalState.addOrder(item)
  }
}
