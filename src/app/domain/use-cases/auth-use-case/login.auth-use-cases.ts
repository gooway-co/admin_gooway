import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Auth } from "../../models/auth/aut.model";
import { AuthGetaway } from "../../models/auth/getaway/auth.getaway";
import { User } from "../../models/user/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthUseCase {

    constructor(private _authGateWay: AuthGetaway){}

    getUserById(id: String): Observable<User>{
        return this._authGateWay.getUserById(id)
    }

    loginUser(username: String, password: String):Observable<Auth>{
        return this._authGateWay.loginUser(username, password)
    }

    register(parameter: User): Observable<User> {
        return this._authGateWay.registerUser(parameter)
    }
}