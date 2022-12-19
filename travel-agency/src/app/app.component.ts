import { Component } from '@angular/core';
import { FloatingComponentsService } from './services/floating-components.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'travel-agency';

  constructor( 
    private floatingComponents: FloatingComponentsService
  ) {}

  hideFloat() {
    this.floatingComponents.hideAll()
  }
}
