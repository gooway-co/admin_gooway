import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserGetaway } from "../../models/user/getaway/user.getaway";
import { User } from "../../models/user/user.model";

@Injectable({
    providedIn: 'root'
})
export class LoginUserUseCase {

    constructor(private _userGateWay: UserGetaway){}

    getUserById(id: String): Observable<User>{
        return this._userGateWay.getUserById(id)
    }

    registerUser(parameter: User): Observable<User> {
        return this._userGateWay.registerUser(parameter);
    }

    loginUser(username: String, password: String):Observable<User>{
        return this._userGateWay.loginUser(username, password)
    }
}