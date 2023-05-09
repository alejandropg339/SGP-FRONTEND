export interface EnrollmentRequestInterface {
    cedula: string;
    cod_universitario: number;
    correo_est: string;
    contrasena: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    correo_personal: string;
    programa_id: string;
    semillero_id?: string;
}

export interface EnrollmentResponseInterface {
    status: string;
    msg: string;
    data: Array<any>
}