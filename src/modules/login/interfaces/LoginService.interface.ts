import { UserPermissionsInterface } from "../../../commons/interfaces/user.interface";

export interface LoginRequestInterface {
    institutionalEmail: string;
    password: string;
}

export interface LoginResponseInterface {
    status: string;
    msg: string;
    data: LoginDataResponseInterface;
}

interface LoginDataResponseInterface {
    cedula: string;
    cod_universitario: number;
    correo_est: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    visibilidad: string;
    correo_personal: string;
    semillero_id: null;
    programa_id: null;
    role: string;
    acceso: UserPermissionsInterface;
    token: string;
}