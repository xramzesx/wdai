import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Output() handleSelect: EventEmitter<number> = new EventEmitter<number>();

  handleClick () {
    console.log('card', this.index )
    this.handleSelect.emit( this.index )
  }

  @Input() title : string = "Określ tytuł"
  @Input() pitch : string = "Określ zajawkę"
  @Input() index: number = -1;
}
