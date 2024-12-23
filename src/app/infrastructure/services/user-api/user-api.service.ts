import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGetaway } from 'src/app/domain/models/user/getaway/user.getaway';
import { User } from 'src/app/domain/models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends UserGetaway {

  constructor(private http: HttpClient) { super();}

  private _url  = environment.url_api;

  getUserById(id: String): Observable<User> {
    return this.http.get<User>(this._url+id);
  }

  registerUser(parameter: User): Observable<User> {
    throw new Error('Method not implemented.');
  }

  loginUser(username: String, password: String): Observable<User> {
    throw new Error('Method not implemented.');
  }
}