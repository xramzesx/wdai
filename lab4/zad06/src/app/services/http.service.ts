import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Article = {
  title: string;
  pitch: string;
  content: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  articlesUrl: string = "./assets/data.json"

  constructor ( private http: HttpClient ) {
  }

  getArticles() {
    return this.http.get<Article[]>(this.articlesUrl)
  }

}
