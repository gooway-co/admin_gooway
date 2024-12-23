import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { AuthApiService } from 'src/app/infrastructure/services/auth-api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  private authService!: AuthApiService;
  constructor(private injector: Injector) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Getting token from local storage
    const dataUser = localStorage.getItem('local_user');
    this.authService = this.injector.get(AuthApiService);
    // Token exist?
    if (dataUser) {
      const token = JSON.parse(dataUser).token;

      // Cloning token and sending it to every headers request

      if (req.url == environment.url_api + 'auth/refresh') {
        const refresh_token = JSON.parse(dataUser).token;
        req = req.clone({
          setHeaders: {
            authorization: `Bearer ${refresh_token}`,
          },
        });
      } else {
        req = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`,
          },
        });
      }
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes("login")) {
          // Token is missing or invalid, log the user out
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
