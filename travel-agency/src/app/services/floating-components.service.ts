import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloatingComponentsService {

  constructor() {     
    this.hideCartChange.subscribe( (hideCart : boolean) => {
      this.hideCart = hideCart
    })

    this.hideMenuChange.subscribe( (hideMenu : boolean) => {
      this.hideMenu = hideMenu
    })

    this.hideUserMenuChange.subscribe( (hideMenu : boolean) => {
      this.hideUserMenu = hideMenu
    })

  }

  hideAll() {
    this.hideCartChange.next(true)
    this.hideMenuChange.next(true)
    this.hideUserMenuChange.next(true)
  }

  //// HAMBURGER MENU ////

  hideMenu : boolean = true
  hideMenuChange: Subject<boolean> = new Subject<boolean>()

  toggleMenu() {
    const current = this.hideMenu
    this.hideAll()

    this.hideMenuChange.next(!current)
  }
  
  //// CART ////

  hideCart : boolean = true
  hideCartChange: Subject<boolean> = new Subject<boolean>()

  toggleCart(){
    const current = this.hideCart
    this.hideAll()
    this.hideCartChange.next(!current)
  }

  //// USER MENU ////
  
  hideUserMenu : boolean = true
  hideUserMenuChange: Subject<boolean> = new Subject<boolean>()

  toggleUserMenu() {
    const current = this.hideUserMenu
    this.hideAll()

    this.hideUserMenuChange.next(!current)
  }
  
}
