import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  id : number = 0
  title : string = ""
  url: string = ''
  albumId: number = 0


  isLoading = true

  ngOnInit(): void {
    this.id = + (this.route.snapshot.paramMap.get('id') ?? this.id )

    this.httpService.getPhoto( this.id ).subscribe( ({title, url, albumId}) => {
      this.title = title
      this.url = url
      this.albumId = albumId
      this.isLoading = false
    })

    this.route.params.subscribe(params => {
      console.log(params)
      this.id = params['id']
      console.log(this.id)
    })
  }
}
