import { Observable } from "rxjs";
import { User } from "../user.model";

export abstract class UserGetaway {
    abstract getUserById(id: String): Observable<User>;
    abstract registerUser(parameter: User): Observable<User>;
    abstract loginUser(username: String, password: String): Observable<User>;
}