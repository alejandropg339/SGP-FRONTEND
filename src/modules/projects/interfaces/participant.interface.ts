export interface ParticipantFormInterface {
    userId: string;
    role: string;
}

export interface AddParticipantResponse {
    status: string;
    msg: string;
    data: Array<any>;
}

export interface ParticipantsResponse {
    status: string;
    msg: string;
    data: Array<Participant>;
}

export interface DeleteParticipantsResponse {
    status: string;
    msg: string;
    data: Array<any>;
}

export interface Participant {
    usuario: string;
    proyecto: number;
    fecha_inicio: string;
    fecha_fin: string | null;
    rol: string;
    cedula: string;
    cod_universitario: number;
    correo_est: string;
    contrasena: string;
    nombres: string;
    apellidos: string;
    telefono: string | null;
    visibilidad: number;
    correo_personal: string | null;
    semillero_id: string | number | null;
    programa_id: number;
}
