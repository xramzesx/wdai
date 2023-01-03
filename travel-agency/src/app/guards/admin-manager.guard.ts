import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '@app/services/token.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/services/auth.service';
import { UserRole } from '@app/types';

@Injectable({
  providedIn: 'root'
})
export class AdminManagerGuard implements CanActivate {
  constructor (
    private tokenService : TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      if ( this.tokenService.user.role !== UserRole.manager && this.tokenService.user.role !== UserRole.admin) {
        this.router.navigate(['/'])
        return false
      }
      
      return true;
  
  }
  
}
