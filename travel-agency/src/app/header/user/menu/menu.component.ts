import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { FloatingComponentsService } from '@app/services/floating-components.service';
import { TokenService } from '@app/services/token.service';
import { defaultUser, UserProps, UserRole } from '@app/types';

@Component({
  selector: 'app-user-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class UserMenuComponent {
  constructor(
    private floatingComponents : FloatingComponentsService,
    private tokenService : TokenService,
    private authService : AuthService
  ) {}

  user: UserProps = defaultUser

  ngOnInit(): void {
    this.tokenService.userChanges.subscribe ( (user: UserProps) => {
      this.user = user
    })
  }
  
  get hide () {
    return this.floatingComponents.hideUserMenu
  }

  hideFloat() {
    this.floatingComponents.hideAll()
  }


  isAnon() {
    console.log(this.user.role)
    return this.user.role == UserRole.anon
  }
  isUser() {
    return this.user.role == UserRole.user || this.user.role == UserRole.admin
  }

  isManager() {
    return this.user.role == UserRole.manager
  }

  logout(){
    this.authService.logout()
  }
  
}
