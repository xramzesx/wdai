import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '@app/types';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts : Post[] = []
  modelForm! : FormGroup


  constructor ( 
    private httpService: HttpService,
    private formBuilder: FormBuilder 
  ) {}

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      title : ['', Validators.required],
      body : ['', Validators.required],
      userId: [0, Validators.required]
    })

    this.modelForm.reset()

    this.httpService.getPosts().subscribe( posts => {
      this.posts = posts
    })
  }

  onSubmit() : void {
    console.log(this.modelForm.value)

    const {userId, title, body} = this.modelForm.value
    this.modelForm.reset()

    this.httpService.createPost({userId, title, body}).subscribe( response => {
      console.log(response)
      this.posts.push({id: response.id, title, body, userId})
    })
  }

}
