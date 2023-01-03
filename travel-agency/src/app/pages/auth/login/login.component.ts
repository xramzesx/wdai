import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { GlobalStateService } from '@app/services/global-state.service';
import { HttpService } from '@app/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  modelForm! : FormGroup
  error: string = ''

  constructor(
    private globalState : GlobalStateService,
    private authService : AuthService,
    private formBuilder : FormBuilder,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email : ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password : ["", [Validators.required]]
    })
  }

  onSubmit() : void {
    this.error = ""
    this.authService.login( 
      this.modelForm.value,
      tokens => {
        console.log(tokens)
        this.router.navigate(['/orders'])
      },
      err => {
        console.log(err)
        this.error = err.error.error
      }
    )
  }
}
