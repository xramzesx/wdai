import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Tokens } from '@app/types';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
    this.accessTokenChanged.subscribe( (token: string) => {
      this.accessToken = token
    })

    this.refreshTokenChanged.subscribe( (token: string) => {
      this.refreshToken = token
    })
  }

  
  setTokens( tokens: Tokens ) {
    if ( tokens.accessToken !== null )
      this.accessTokenChanged.next(tokens.accessToken)
      
    if ( tokens.refreshToken !== null )
      this.refreshTokenChanged.next(tokens.refreshToken)
  }

  //// JWT ACCESSS TOKEN ////

  accessTokenChanged : Subject<string> = new Subject<string>()

  get accessToken() {
    return localStorage.getItem('accessToken') ?? ""
  }

  set accessToken( token : string ) {
    localStorage.setItem('accessToken', token)
  }


  //// JWT REFRESH TOKEN ////

  refreshTokenChanged : Subject<string> = new Subject<string>()

  get refreshToken () {
    return localStorage.getItem('refreshToken') ?? ""
  }

  set refreshToken( token : string ) {
    localStorage.setItem('refreshToken', token)
  }

}
