import { CreateProjectForm } from "../interfaces/createProjectForm.interface"
import { ProjectsResponseData } from "../interfaces/projects.interface"

interface RequestProject {
    titulo: string;
    descripcion: string;
    tipo_proyecto: string;
    metodologia: string;
    justificacion: string;
    ciudad: string;
    estado: string;
    programa_id?: number;
    fecha_inicio?: string | Date | null | undefined;
    fecha_fin?:  string | Date | null | undefined;
}

export const requestTransform = (formValues: CreateProjectForm) => {
    const request: RequestProject = {
        titulo: formValues.title,
        descripcion: formValues.description,
        tipo_proyecto: formValues.projectType,
        metodologia: formValues.methodology,
        justificacion: formValues.justification,
        ciudad: formValues.city,
        estado: formValues.projectStatus!,
        programa_id: Number(formValues.program)
    }

    if(formValues.initialDate && formValues.finalDate) {
        request.fecha_inicio = formValues.initialDate;
        request.fecha_fin = formValues.finalDate;
    }else if(formValues.initialDate && !formValues.finalDate) {
        request.fecha_inicio = formValues.initialDate;
    } else if(!formValues.initialDate && formValues.finalDate) {
        request.fecha_fin = formValues.finalDate;
    }

    return request;
}

export const responseToForm = (project: ProjectsResponseData) => {
    return {
        title: project.titulo,
        description: project.descripcion,
        projectType: project.tipo_proyecto && project.tipo_proyecto.toUpperCase(),
        methodology: project.metodologia,
        justification: project.justificacion,
        projectStatus: project.estado && project.estado.toUpperCase(),
        city: project.ciudad && project.ciudad.toUpperCase(),
        initialDate: project?.fecha_inicio,
        finalDate: project?.fecha_fin,
        program: project.programa_id
    }
}