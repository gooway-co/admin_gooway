import { Observable } from "rxjs";
import { StudentModel } from "../student.model";

    export abstract class StudentGetaway {
    abstract getStudent(id: String): Observable<StudentModel>;
    abstract getStudentById(id: String): Observable<StudentModel>;
    abstract createStudent(parameter: StudentModel): Observable<StudentModel>;
    abstract updateStudent(parameter: StudentModel, id: String): Observable<StudentModel>;
    abstract deleteStudent(id: String): Observable<StudentModel>;

}