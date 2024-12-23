export interface Place {
    id?: string;
    name: string;
    images: [];
    longitud: number;
    latitud: number;
    description: string;
    autor?: string;
    openingDate?: Date;
    dedication?: string;
    reference?: string;
    referencePhoto?: string;
    mainTypology?: string;
    secondaryTypology?: string;
    advocacy?: string;
    companyId: String;
    audio:  Blob;
    categoryId: string;
    address: string;
}