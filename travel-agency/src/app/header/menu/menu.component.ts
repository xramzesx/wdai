import { Component, OnInit } from '@angular/core';
import { FloatingComponentsService } from '@app/services/floating-components.service';
import { TokenService } from '@app/services/token.service';
import { defaultUser, UserProps, UserRole } from '@app/types';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  constructor(
    private floatingComponents : FloatingComponentsService,
    private tokenService : TokenService
  ) {}
  
  user : UserProps = defaultUser

  ngOnInit(): void {
    this.tokenService.userChanges.subscribe(user => {
      this.user = user
    })
  }

  get hide () {
    return this.floatingComponents.hideMenu
  }

  hideFloat() {
    this.floatingComponents.hideAll()
  }

  get isUser () {
    return this.user.role == UserRole.user || this.user.role == UserRole.admin || this.user.role == UserRole.manager
  }

  get isAdmin() {
    return this.user.role == UserRole.admin
  }

  get isManager () {
    return this.user.role == UserRole.manager
  }
}
