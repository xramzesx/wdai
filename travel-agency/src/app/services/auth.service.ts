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
  ) {
    this.refresh()
  }


  private defaultCallback : any = (
    onSuccess: (tokens: Tokens) => void = ( a ) => {},
    onErrors: (error : any) => void = ( a ) => {},  
  )  => ({
    next : (tokens: Tokens) => {
      this.tokenService.setTokens(tokens)
      this.globalState.refreshOrders()
      onSuccess(tokens)
    },
    error : (err : any) => {
      onErrors(err)
    } 
  })

  login ( 
    props : LoginProps, 
    onSuccess: (tokens: Tokens) => void = ( a ) => {},
    onErrors: (error : any) => void = ( a ) => {},
  ) {
    this.httpService
      .login(props)
      .subscribe(this.defaultCallback(onSuccess, onErrors))
  }

  register( 
    props : RegisterProps,
    onSuccess: (tokens: Tokens) => void = ( a ) => {},
    onErrors: (error : any) => void = ( a ) => {},
  ) {
    this.httpService
      .register(props)
      .subscribe( this.defaultCallback(onSuccess, onErrors) )
  }

  refresh(
    onSuccess: (tokens: Tokens) => void = ( a ) => {},
    onErrors: (error : any) => void = ( a ) => {}
  ) {
    console.log(this.tokenService.accessToken, this.tokenService.refreshToken)

    this.httpService
      .refresh()
      .subscribe( this.defaultCallback(
        (tokens:Tokens) => {
          console.log('refresh',tokens)
          onSuccess(tokens)
        }, (err : any) => {
          console.log('refresh-err',err)
          onErrors(err)
        } 
      ))
  }

  logout() {
    this.tokenService.logout()
    this.globalState.refreshOrders()
  }
}
