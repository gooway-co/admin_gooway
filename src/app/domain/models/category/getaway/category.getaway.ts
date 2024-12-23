import { Observable } from "rxjs";
import { Category } from "../category.model";

    export abstract class CategoriaGetaway {
    abstract getCategoria(id: String): Observable<Category>;
    abstract getCategoriaById(id: String): Observable<Category>;
    abstract createCategoria(parameter: Category): Observable<Category>;
    abstract updateCategoria(parameter: Category, id: String): Observable<Category>;
    abstract deleteCategoria(id: String): Observable<Category>;
}