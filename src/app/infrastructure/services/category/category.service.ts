// src/app/application/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../../domain/models/category/category.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthApiService } from '../auth-api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  urlApi = environment.url_api;
  local: any;
  constructor(private http: HttpClient, private _authService: AuthApiService,) {
    this.local = this._authService.getInfoLocal();
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      //Deprecated. Http requests never emit an ErrorEvent
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    throw new Error(errorMessage);
  }

  addCategory(category: any): Observable<any> {

    const URI = this.urlApi + 'categories/create';
    return this.http.post(URI, category).
      pipe(
        catchError(async (err) => {
          if (err.status == 401) {
            this._authService.logout();
          }
          this.handleError(err);
        }
      )
    )
  }

  updateCategory(id: string, category: Category): Observable<any> {
    const URI = this.urlApi + `categories/update/${id}`;
    return this.http.put<Category>(URI, category).
      pipe(
        catchError(async (err) => {
          if (err.status == 401) {
            this._authService.logout();
          }
          this.handleError(err);
        })
      )
  }

  deleteCategory(id: string): Observable<any> {
    const URI = this.urlApi + `categories/delete/${id}`;

    return this.http.delete<void>(URI).pipe(
      catchError(async (err) => {
        if (err.status == 401) {
          this._authService.logout();
        }
        this.handleError(err);
      })
    );
  }

  getCategoryById(id: string): Observable<any> {
    let companyId = this.local.companyId

    const URI = this.urlApi + `categories/findById/${id}`;
    let data = {
      "companyId": companyId
    };

    return this.http.post<Category>(URI, data).
      pipe(
        catchError(async (err) => {
          if (err.status == 401) {
            this._authService.logout();
          }
          this.handleError(err);
        })
      )
  }

  getCategories(): Observable<any> {
    const URI = this.urlApi + `categories/listar`;
    let companyId = this.local.companyId

    return this.http.get<Category>(URI).
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
