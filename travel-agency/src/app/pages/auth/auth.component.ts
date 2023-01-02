import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalStateService } from '@app/services/global-state.service';
import { HttpService } from '@app/services/http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  modelForm! : FormGroup

  constructor(
    private globalState : GlobalStateService,
    private httpService : HttpService,
    private formBuilder : FormBuilder
  ) {}

  ngOnInit(): void {
    // this.modelForm = this.formBuilder

  }
}
