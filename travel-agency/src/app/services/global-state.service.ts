import { Injectable } from '@angular/core';
import { CartItem } from '@app/types';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  // This service contains all global state //

  cart : Map<number, CartItem> = new Map()
  
  addToCart (item : CartItem) : void {
    if ( this.cart.has(item.id) ){

    } else {
      this.cart.set(item.id, item)
    }
  }

  removeFromCart (item: CartItem) : void {

  } 

  constructor(private httpService: HttpService) { }
}
