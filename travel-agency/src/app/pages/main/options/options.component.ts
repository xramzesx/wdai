import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  @Output() filters : EventEmitter<any> = new EventEmitter()

  handleFilters( filters : any ) {
    this.filters.emit(filters)
  }
}
