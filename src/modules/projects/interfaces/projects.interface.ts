export interface CreateProjectRequest {
    tipo_proyecto: string;
    titulo: string;
    descripcion: string;
    ciudad: string;
    metodologia: string;
    justificacion: string;
}

export interface UpdateProjectRequest {
    tipo_proyecto: string;
    titulo: string;
    descripcion: string;
    ciudad: string;
    metodologia: string;
    justificacion: string;
    estado?: string;
}

export interface UpdateProjectResponse { 
    status: string;
    msg: string;
    data: Array<number>;
}

export interface CreateProjectResponse {
    status: string;
    msg: string;
    data: Array<number>;
}

export interface DeleteProjectResponse {
    status: string;
    msg: string;
    data: Array<number>;
}

export interface ActivateProjectResponse {
    status: string;
    msg: string;
    data: Array<number>;
}

export interface ProjectsResponse {
    status: string;
    msg:    string;
    data:   ProjectsResponseData[];
}

export interface ProjectResponse {
    status: string;
    msg:    string;
    data:   ProjectsResponseData;
}

export interface ProjectsResponseData {
    id:                      number;
    titulo:                  string;
    estado:                  string;
    descripcion:             string;
    macro_proyecto:          null;
    fecha_inicio:            Date | null | string | undefined;
    fecha_fin:               Date | null | string | undefined;
    semillero:               null;
    retroalimentacion_final: null | string;
    visibilidad:             number;
    ciudad:                  string;
    metodologia:             string;
    conclusiones:            null | string;
    justificacion:           string;
    nota:                    number | null;
    tipo_proyecto:           string;
    programa_id:             number;
    programa:               string;
    participantes:          Array<{usuario: string, rol: string}>;
}