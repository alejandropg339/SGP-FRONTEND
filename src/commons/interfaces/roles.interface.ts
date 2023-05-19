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
        rol: string;
    }
}

