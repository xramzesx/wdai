import { Injectable } from '@angular/core';
import { LoginProps, RegisterProps, Tokens } from '@app/types';
import { GlobalStateService } from './global-state.service';
import { HttpService } from './http.service';

import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpService : HttpService,
    private globalState : GlobalStateService,
    private tokenService : TokenService
  ) {}


  login ( 
    props : LoginProps, 
    onSuccess: (tokens: Tokens) => void = ( a ) => {},
    onErrors: (error : any) => void = ( a ) => {},
  ) {
    this.httpService
      .login(props)
      .subscribe( (tokens: Tokens) => {
        this.tokenService.setTokens(tokens)
        onSuccess(tokens)
      })
  }

  register( 
    props : RegisterProps,
    onSuccess: (tokens: Tokens) => void = ( a ) => {},
    onErrors: (error : any) => void = ( a ) => {},
  ) {
    this.httpService.register(props).subscribe( (tokens: Tokens) => {
      this.tokenService.setTokens(tokens)
      onSuccess(tokens)
    })
  }

  refresh() {

  }
}
