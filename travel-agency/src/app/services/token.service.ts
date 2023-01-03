import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { defaultUser, Tokens, UserProps } from '@app/types';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
    this.isLogged = !!(this.accessToken.length && this.refreshToken.length)

    this.accessTokenChanged.subscribe( (token: string) => {
      this.accessToken = token
    })

    this.refreshTokenChanged.subscribe( (token: string) => {
      this.refreshToken = token
    })

    this.userChanges.subscribe( (user: UserProps) => {
      this.user = user
    })

    this.isLoggedChanges.subscribe( (isLogged: boolean) => {
      this.isLogged = isLogged
    })
  }

  get headers () {
    return { 'Authorization': `Bearer ${this.accessToken}, Refresh ${this.refreshToken}`}
  }
  
  setTokens( tokens: Tokens ) {
    if ( tokens.accessToken !== null )
      this.accessTokenChanged.next(tokens.accessToken)
      
    if ( tokens.refreshToken !== null )
      this.refreshTokenChanged.next(tokens.refreshToken)

    if (tokens.accessToken !== null && tokens.refreshToken !== null)
      this.onIsLoggedChange(true)

    if ( tokens.user )
      this.userChanges.next( tokens.user )
  }

  //// LOGOUT ////

  logout() {
    this.accessTokenChanged.next('')
    this.refreshTokenChanged.next('')
    this.userChanges.next(defaultUser)
    this.isLoggedChanges.next(false)
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

  //// USER ////

  user : UserProps = defaultUser

  userChanges : Subject<UserProps> = new Subject<UserProps>()

  onUserChange( user : UserProps ) {
    this.userChanges.next(user)
  }

  //// IS LOGGED ////

  isLogged : boolean = false

  isLoggedChanges : Subject<boolean> = new Subject<boolean>()

  onIsLoggedChange( isLogged : boolean) {
    this.isLoggedChanges.next(isLogged)
  }

}
