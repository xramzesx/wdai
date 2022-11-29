import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService, Article } from './services/http.service';


const mock : Article = {
  title : "Wybierz artykuł",
  pitch : "Skorzystaj z komponentu poniżej",
  content: ""
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'zad06';

  selectedArticle: Article = mock

  articles: Article[] = []
  activeArticle: number = -1

  handleSelect( index: number ) {
    console.log(index)
    if ( 0 <= index && index < this.articles.length )
      this.selectedArticle = this.articles[index]
    else
      this.selectedArticle = mock
    this.activeArticle = index
  }

  constructor( private httpService: HttpService) {
    httpService.getArticles().subscribe( data => {
      this.articles = data
    })
  }
}
