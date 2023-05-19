export interface ProjectTypesInterface {
    status: string;
    msg:    string;
    data:   ProjectTypesDataInterface[];
}

export interface ProjectTypesDataInterface {
    nombre:      string;
    descripcion: string;
}
