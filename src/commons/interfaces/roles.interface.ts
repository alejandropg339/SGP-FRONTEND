import { UserPermissionsInterface } from "./user.interface";

export interface RolesResponseInterface {
    status: string;
    msg: string;
    data: Array<RolesDataInterface>
}


export interface RolesDataInterface {
    nombre: string;
    descripcion: string;
}

export interface UserRoleResponseInterface {
    status: string;
    msg: string;
    data: {
        nombre: string;
        descripcion: string;
        acceso: UserPermissionsInterface;
    }
}

export interface CreateRoleRequestInterface {
    tipo_usuario: string;
    USUARIOS: string;
    PROGRAMAS: string;
    FACULTADES: string;
    EVENTOS: string;
    PROYECTOS: string;
    SEMILLEROS: string;
    REPORTES: string;
    ROLES: string;
}

export interface CreateRoleResponseInterface {
    status: string;
    msg: string;
    data: Array<any>
}

