import { Component, HostListener, OnInit } from '@angular/core';
import { FloatingComponentsService } from '@app/services/floating-components.service';
import { GlobalStateService } from '@app/services/global-state.service';
import { Cart, CartItem } from '@app/types';

@Component({
  selector: '[app-cart-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class CartButtonComponent implements OnInit{
  total : number = 0
  counter : number = 0

  constructor( 
    private globalState: GlobalStateService,
    private floatingComponents : FloatingComponentsService 
  ) {}

  @HostListener('click')
  handleClick () {
    this.floatingComponents.toggleCart()
  }

  ngOnInit(): void {
    this.globalState.cartChange.subscribe( (cart: Cart) => {
      const arr =  Array.from(
        cart.values()
      )
      
      this.counter = arr.length
      
      this.total = arr.reduce((
        accumulator: number, 
        { price, quantity } : CartItem
      ) => accumulator + quantity * price * 100, 0) / 100
    })
  }
}
