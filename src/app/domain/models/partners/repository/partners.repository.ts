import { Observable } from "rxjs";
import { Partners } from "../partners.interface";

    export abstract class PartnersRepositroy {
    abstract getPartnersById(id: String): Observable<Partners>;
    abstract getCategoriaById(id: String): Observable<Partners>;
    abstract create(parameter: Partners): Observable<Partners>;
    abstract update(parameter: Partners, id: String): Observable<Partners>;
    abstract delete(id: String): Observable<Partners>;
}