import { Observable } from "rxjs";
import { Place } from "../place.interface";

    export abstract class PlaceRepositroy {
    abstract getPlaceById(id: String): Observable<Place>;
    abstract getCategoriaById(id: String): Observable<Place>;
    abstract create(parameter: Place): Observable<Place>;
    abstract update(parameter: Place, id: String): Observable<Place>;
    abstract delete(id: String): Observable<Place>;
}