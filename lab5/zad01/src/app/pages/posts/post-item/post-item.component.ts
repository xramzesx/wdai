import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {
  @Input() userId : number = 0 
  @Input() id : number = 0
  @Input() title : string = ''
  @Input() body : string = ''
}
