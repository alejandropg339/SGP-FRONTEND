import { CreateProjectForm } from "../interfaces/createProjectForm.interface"
import { ProjectsResponseData } from "../interfaces/projects.interface"

export const requestTransform = (formValues: CreateProjectForm) => {
    return {
        titulo: formValues.title,
        descripcion: formValues.description,
        tipo_proyecto: formValues.projectType,
        metodologia: formValues.methodology,
        justificacion: formValues.justification,
        ciudad: formValues.city,
        estado: formValues?.projectStatus 
    }
}

export const responseToForm = (project: ProjectsResponseData) => {
    return {
        title: project.titulo,
        description: project.descripcion,
        projectType: project.tipo_proyecto,
        methodology: project.metodologia,
        justification: project.justificacion,
        projectStatus: project.estado,
        city: project.ciudad,
    }
}