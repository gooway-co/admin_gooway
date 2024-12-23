// src/app/application/Place.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthApiService } from '../auth-api/auth-api.service';
import { Place } from 'src/app/domain/models/place/place.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  urlApi = environment.url_api;
  local: any;
  constructor(private http: HttpClient, private _authService: AuthApiService) {
    this.local = this._authService.getInfoLocal();
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    throw new Error(errorMessage);
  }

  create(event: any): Observable<any> {

    const URI = this.urlApi + 'events/create';
    return this.http.post<Place>(URI, event).pipe(
      catchError(async (err) => {
        if (err.status == 401) {
          this._authService.logout();
        }
        this.handleError(err);
      })
    );
  }

  update(id: string, event: any): Observable<any> {
    const URI = this.urlApi + `places/update/${id}`;
    return this.http.put<Place>(URI, event).pipe(
      catchError(async (err) => {
        if (err.status == 401) {
          this._authService.logout();
        }
        this.handleError(err);
      })
    );
  }

  delete(id: string): Observable<any> {
    const URI = this.urlApi + `events/delete/${id}`;

    return this.http.delete<void>(URI).pipe(
      catchError(async (err) => {
        if (err.status == 401) {
          this._authService.logout();
        }
        this.handleError(err);
      })
    );
  }

  getById(id: string): Observable<any> {
    let companyId = this.local.companyId;

    const URI = this.urlApi + `events/findById/${id}`;
    let data = {
      companyId: companyId,
    };

    return this.http.post<Place>(URI, data).pipe(
      catchError(async (err) => {
        if (err.status == 401) {
          this._authService.logout();
        }
        this.handleError(err);
      })
    );
  }

  getEvents(): Observable<any> {
    const URI = this.urlApi + `events/list`;

    return this.http.get<Place>(URI).pipe(
      catchError(async (err) => {
        if (err.status == 401) {
          this._authService.logout();
        }
        this.handleError(err);
      })
    );
  }
}
