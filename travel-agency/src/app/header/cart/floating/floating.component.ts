import { Component, HostBinding, OnInit } from '@angular/core';
import { GlobalStateService } from '@app/services/global-state.service';
import { Cart, CartItem } from '@app/types';

@Component({
  selector: 'app-cart-floating',
  templateUrl: './floating.component.html',
  styleUrls: ['./floating.component.scss']
})
export class CartFloatingComponent implements OnInit{
  constructor(
    private globalState: GlobalStateService
  ) { }

  ngOnInit(): void {
  }

  get items() : CartItem[] {
    return Array.from( this.globalState.cart , ([name, value]) => value)
  }

  get hide () :boolean {
    return this.globalState.hideCart
  }

  get totalValue () {
    return this.items.reduce( (acc, {price, quantity}) => acc + price * quantity * 100, 0) / 100
  }
}
