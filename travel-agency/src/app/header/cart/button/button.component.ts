import { Component, OnInit } from '@angular/core';
import { GlobalStateService } from '@app/services/global-state.service';
import { Cart, CartItem } from '@app/types';

@Component({
  selector: '[app-cart-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class CartButtonComponent implements OnInit{
  total : number = 0
  
  constructor( private globalState: GlobalStateService ) {}

  ngOnInit(): void {
    this.globalState.cartChange.subscribe( (cart: Cart) => {
      this.total = Array.from(
        cart.values()
      ).reduce((
        accumulator: number, 
        { price, quantity } : CartItem
      ) => accumulator + quantity * price * 100, 0) / 100
    })
  }
}
