import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo, Post } from '@app/types';
import { ApiPaths } from '../api-paths';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl : string = environment.baseUrl

  getPath ( path : string ) : string {
    return `${this.baseUrl}${path}`
  }

  constructor(private httpClient: HttpClient ) { }

  getPosts() {
    return this.httpClient.get<Post[]>(this.getPath(ApiPaths.posts))
  }

  getPhotos() {
    return this.httpClient.get<Photo[]>(this.getPath(ApiPaths.photos))
  }

  getPhotoUrl( id : number ) {
    return `/photo/${id}`
  }

  getPhoto( id : number ) {
    return this.httpClient.get<Photo>(this.getPath(`${ApiPaths.photos}/${id}`))
  }


  createPost( data : any ) {
    return this.httpClient.post<Post>(this.getPath(ApiPaths.posts), JSON.stringify(data))
  }
}
