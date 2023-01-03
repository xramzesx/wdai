import { Component, OnInit } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { UserProps } from '@app/types';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit{
  constructor(
    private httpService : HttpService
  ) {

  }

  users: UserProps[] = []

  ngOnInit(): void {
    this.httpService.getUsers().subscribe( (users : UserProps[]) => {
      this.users = users
    })
  }
}
