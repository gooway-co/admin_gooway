import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Auth } from 'src/app/domain/models/auth/aut.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

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

  urlApi = environment.url_api;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  local: any; 
  get isLoggedIn() {
    this.local = localStorage.getItem('local_user');
    if (this.local) {
      this.loggedIn.next(false);
    } else {
      this.loggedIn.next(true);
      this.logout();
    }
    return this.loggedIn.asObservable();
  }

  async login(datauser: any): Promise<any> {
    try {
      const URI =  this.urlApi + 'auth/login';
      const response: any = await this.http.post(URI, datauser).toPromise();
      if(response.status == 400){
        

        let data = {

          email: "frainer2013@gmail.com",
          password :         "1234567",
          name:"Frainer",
          lastName:"Simarra Aguilar"
        }

        this.loggedIn.next(false);
        localStorage.setItem('local_user',  JSON.stringify(data));
      }
      return response;
    } catch (error) {
      let user = {
        error: true,
        msg: 'Ha ocurrido un error inesperado'
      }
      return {user: user};
    }
  } 

  async registerUser(dataUser: any): Promise<any> {
    try {
      const URI = this.urlApi + 'auth/register';
      const data = await this.http.post(URI, dataUser).toPromise();
      console.log('result service register ', data);
      
      return data;
    } catch (error) {
      return error;
    }
  }

  logout() {
    localStorage.removeItem('local_user');
    this.loggedIn.next(true);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // protected():Observable<any>{
  //   const URI = this.urlApi + 'auth/protected';
  //   return this.http.get(URI).pipe(
  //     catchError((err: HttpErrorResponse) => {
  //       if (err.status === 401) {
  //         this.logout() 
  //       }
  //       // Lanza el error nuevamente para ser manejado
  //       return this.handleError(err);
  //     })
  //   );
  // }

  getInfoLocal(){
    this.local = JSON.parse(`${localStorage.getItem('local_user')}`);
    return this.local;
  }
}
