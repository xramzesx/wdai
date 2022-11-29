import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.scss']
})
export class ContentViewComponent {
  @Input() title: string = "Wybierz artykuł"
  @Input() pitch: string = "Skorzystaj z komponentu poniżej"
  @Input() content: string = ""
}
