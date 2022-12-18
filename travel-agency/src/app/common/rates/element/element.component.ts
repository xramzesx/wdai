import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rate-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent {
  @Input() contain : boolean = true
  @Input() current : boolean = false
  @Input() disabled : boolean = false;
  
  @Input() index : number = 0

  @Output() handleClick : EventEmitter<number> = new EventEmitter()

  @HostListener('click')
  onClick() {
    this.handleClick.emit(this.index)
  }
}
