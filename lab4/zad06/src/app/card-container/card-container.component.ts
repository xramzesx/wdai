import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../services/http.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent {
  @Output() handleSelection: EventEmitter<number> = new EventEmitter<number>();
  
  handleClick( num: number ){
    this.handleSelection.emit(num)
  }
  @Input() articles: Article[] = [];
}
