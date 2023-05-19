export interface CreateProjectRequest {
    tipo_proyecto: string;
    titulo: string;
    descripcion: string;
    ciudad: string;
    metodologia: string;
    justificacion: string;
}

export interface CreateProjectResponse {
    status: string;
    msg: string;
    data: Array<number>;
}

export interface ProjectsResponse {
    status: string;
    msg:    string;
    data:   ProjectsResponseData[];
}

export interface ProjectsResponseData {
    id:                      number;
    titulo:                  string;
    estado:                  string;
    descripcion:             string;
    macro_proyecto:          null;
    fecha_inicio:            Date;
    fecha_fin:               Date | null;
    semillero:               null;
    retroalimentacion_final: null | string;
    visibilidad:             number;
    ciudad:                  string;
    metodologia:             string;
    conclusiones:            null | string;
    justificacion:           string;
    nota:                    number | null;
    tipo_proyecto:           string;
}