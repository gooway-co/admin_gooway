import { Observable } from "rxjs";
import { User } from "../../user/user.model";
import { Auth } from "../aut.model";


export abstract class AuthGetaway {
    abstract getUserById(id: String): Observable<User>;
    abstract registerUser(parameter: User): Observable<User>;
    abstract loginUser(username: String, password: String): Observable<Auth>;
}