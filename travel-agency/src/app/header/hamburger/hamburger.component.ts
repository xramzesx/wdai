import { Component, HostListener, OnInit } from '@angular/core';
import { FloatingComponentsService } from '@app/services/floating-components.service';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent {
  constructor ( private floatingComponents : FloatingComponentsService ) {}

  @HostListener('click')
  handleClick() {
    this.floatingComponents.toggleMenu()
  }

  get active () {
    return !this.floatingComponents.hideMenu
  }

}
