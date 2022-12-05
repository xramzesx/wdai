import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rate-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent {
  @Input() value : number = 0
  @Input() rate : number = 0
  @Input() maxRate: number = 5
  
}
