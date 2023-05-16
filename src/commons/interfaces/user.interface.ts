export interface UserInterface {
    numberId: string;
    uCode: number;
    institutionalEmail: string;
    name: string;
    lastName: string;
    phone: string;
    visibility: string;
    role: string;
    programId?: string | null;
    hotbedId?: string | null;
}

export interface AllUsersResponseInterface {
    status: string;
    msg: string;
    data: UserResponseDataInterface[];
}

export interface UserResponseDataInterface {
    cedula: string;
    cod_universitario: number;
    correo_est: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    visibilidad: string;
    correo_personal: string;
    semillero_id?: string;
    programa_id?: string;

}

export interface UserDeleteResponseInterface {
    status: string;
    msg: string;
    data: [];
}