import { Injectable } from '@angular/core';
import { Cart, CartItem, currencies, Currency } from '@app/types';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  // This service contains all global state //

  
  currency : Currency = currencies[0];
  currencyChange : Subject<Currency> = new Subject<Currency>()

  onCurrencyChange ( index: number ) {
    this.currencyChange.next( currencies[index] )
  } 

  
  constructor(private httpService: HttpService) { 
    this.currencyChange.subscribe( 
      (value: Currency) => { 
        this.currency = value 
      } 
    )

    this.cartChange.subscribe(
      (value: Cart) => {
        this.cart = value
      }
    )
  }

  cart : Map<number, CartItem> = new Map()
  cartChange : Subject< Cart > = 
    new Subject< Cart >()


  addToCart (item : CartItem) : void {
    if ( item.quantity == 0 ) return;
    
    if ( this.cart.has(item.id) ){
      const current : any = this.cart.get(item.id)
      this.cart.set(item.id, { ...current, quantity : current.quantity + item.quantity })
    } else {
      this.cart.set(item.id, item)
    }

    this.cartChange.next(this.cart)

    console.log(this.cart)
  }

  removeFromCart (item: CartItem) : void {

  } 
}
