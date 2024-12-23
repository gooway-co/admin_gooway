export interface StudentModel {
    _id?: string;
    name: string;
    user_id: string;
    lastName: string;
    fullName: string;
    email: string;
    gender: string;
    city: string;
    birthday: Date;
    phone: number;
    rol?: string
    password?: string
    status: string
    grade: string
    type_document: string
    number_document: number
    id_business: string
    relationships: any[];
    qrUser: string;
    bloodType: string;
    address: string;
    language: string;
}