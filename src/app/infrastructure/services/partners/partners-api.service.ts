// src/app/application/Place.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthApiService } from '../auth-api/auth-api.service';
import { Partners } from 'src/app/domain/models/partners/partners.interface';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  
  urlApi = environment.url_api;
  local: any;
  constructor(private http: HttpClient, private _authService: AuthApiService,) {
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

  addPartners(Partners: any): Observable<any> {
      Partners.append('companyId', this.local.companyId);

      const URI = this.urlApi + 'partners/create';
      return this.http.post<Partners>(URI, Partners).
      pipe(
        catchError(async (err) => {
          if (err.status == 401) {
            this._authService.logout();
          }
          this.handleError(err);
        })
    )
  }

  updatePartners(id: string, Partners: Partners): Observable<any> {
    const URI = this.urlApi + `partners/update/${id}`;
    return this.http.post<Partners>(URI, Partners).
    pipe(
      catchError(async (err) => {
        if (err.status == 401) {
          this._authService.logout();
        }
        this.handleError(err);
      })
    )
  }

  deletePartners(id: string): Observable<any> {
    const URI = this.urlApi + `partners/delete/${id}`;

    return this.http.post<void>(URI, {}).pipe(
      catchError(async (err) => {
        if (err.status == 401) {
          this._authService.logout();
        }
        this.handleError(err);
      })
    );
  }

  getPartnersById(id: string): Observable<any> {
    let companyId = this.local.companyId

    const URI = this.urlApi + `partners/findById/${id}`;
    let data = {
      "companyId" : companyId
    };

    return this.http.post<Partners>(URI, data).
    pipe(
      catchError(async (err) => {
        if (err.status == 401) {
          this._authService.logout();
        }
        this.handleError(err);
      })
    )
  }

  getPartnersByCompany(): Observable<any> {
    const URI = this.urlApi + `partners/listar`;
    let companyId = this.local.companyId

    let data = {
      "companyId" : companyId
    };
    
    return this.http.post<Partners>(URI, data).
    pipe(
      catchError(async (err) => {
        if (err.status == 401) {
          this._authService.logout();
        }
        this.handleError(err);
      })
    )
  }
}
