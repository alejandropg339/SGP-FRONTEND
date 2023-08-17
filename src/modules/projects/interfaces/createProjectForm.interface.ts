export interface CreateProjectForm { 
    title: string;
    description: string;
    city: string;
    methodology: string;
    justification: string;
    projectType: string;
    program: number | string;
    projectStatus? : string;
    initialDate?: Date | null | string | undefined;
    finalDate?: Date | null | string | undefined;
    user?: string;
}      
