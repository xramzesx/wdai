import { Component } from '@angular/core';
import { FloatingComponentsService } from '@app/services/floating-components.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(
    private floatingComponents : FloatingComponentsService
  ) {}
  
  get hide () {
    return this.floatingComponents.hideMenu
  }

  hideFloat() {
    this.floatingComponents.hideAll()
  }
}
