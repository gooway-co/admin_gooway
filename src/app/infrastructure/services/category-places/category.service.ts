// src/app/application/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../../../domain/models/category/category.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthApiService } from '../auth-api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryPlacesService {

  urlApi = environment.url_api;
  local: any;
  constructor(private http: HttpClient, private _authService: AuthApiService,) {
    this.local = this._authService.getInfoLocal();
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
  
    if (err.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${err.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
  
    // Devuelve el error envuelto en un throwError para que catchError lo procese correctamente
    return throwError(() => new Error(errorMessage));
  }

  addCategory(category: any): Observable<any> {
    // Agrega el companyId al objeto category
  
    const URI = this.urlApi + `categoriesPlaces/create`;
    console.log("category ", category);
  
    return this.http.post(URI, category).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this._authService.logout();
        }
        // Lanza el error nuevamente para ser manejado
        return this.handleError(err);
      })
    );
  }
  

  updateCategory(id: string, category: Category): Observable<any> {
    const URI = this.urlApi + `categoriesPlaces/update/${id}`;
    return this.http.put<Category>(URI, category).
      pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this._authService.logout();
          }
          // Lanza el error nuevamente para ser manejado
          return this.handleError(err);
        })
      )
  }

  deleteCategory(id: string): Observable<any> {
    const URI = this.urlApi + `categoriesPlaces/delete/${id}`;

    return this.http.delete<void>(URI).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this._authService.logout();
        }
        // Lanza el error nuevamente para ser manejado
        return this.handleError(err);
      })
    );
  }

  // getCategoryById(id: string): Observable<any> {
  //   let companyId = this.local.companyId

  //   const URI = this.urlApi + `categoriesPlaces/findById/${id}`;
    

  //   return this.http.post<Category>(URI, data).
  //     pipe(
  //       catchError((err: HttpErrorResponse) => {
  //         if (err.status === 401) {
  //           this._authService.logout();
  //         }
  //         // Lanza el error nuevamente para ser manejado
  //         return this.handleError(err);
  //       })
  //     )
  // }

  getCategories(): Observable<any> {
    const URI = this.urlApi + `categoriesPlaces/listar`;

 
    return this.http.get<Category>(URI).
      pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this._authService.logout();
          }
          // Lanza el error nuevamente para ser manejado
          return this.handleError(err);
        })
      )
  }
}
