import { Component, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.scss']
})
export class PhotoItemComponent {
  @Input() src : string = ""
  
  @Input() photoId : number = 0
  @Input() albumId: number = 0
  @Input() title : string = ''

  constructor (private httpService: HttpService) {}

  get path () : string {
    return this.httpService.getPhotoUrl(this.photoId)
  }

}
