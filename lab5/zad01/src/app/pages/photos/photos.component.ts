import { Component, OnInit } from '@angular/core';
import { Photo } from '@app/types';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit{
  photos : Photo[] = []

  constructor (private httpService: HttpService ) { }

  ngOnInit(): void {
    this.httpService.getPhotos().subscribe( photos => {
      this.photos = photos
      console.log(photos)
    })
  }

}
