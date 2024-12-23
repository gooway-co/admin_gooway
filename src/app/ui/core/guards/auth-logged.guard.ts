import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthApiService } from 'src/app/infrastructure/services/auth-api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthLoggedGuard implements CanActivate {
  constructor(private _authService: AuthApiService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this._authService.loggedIn.pipe(
      take(1),
      map((isLogged: boolean) => {
        if (!isLogged) {
          this.router.navigate(['/admin']);
          return false;
        }
        return true;
      })
    );

    // return true;
  }
}
