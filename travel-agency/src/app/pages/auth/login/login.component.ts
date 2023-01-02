import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { GlobalStateService } from '@app/services/global-state.service';
import { HttpService } from '@app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  modelForm! : FormGroup

  constructor(
    private globalState : GlobalStateService,
    private authService : AuthService,
    private formBuilder : FormBuilder
  ) {}

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email : ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password : ["", [Validators.required]]
    })
  }

  onSubmit() : void {
    this.authService.login( 
      this.modelForm.value,
      tokens => {
        console.log(tokens)
      }  
    )
  }
}
