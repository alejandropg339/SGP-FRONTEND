export interface CreateProjectForm { 
    title: string;
    description: string;
    city: string;
    methodology: string;
    justification: string;
    projectType: string;
    projectStatus? : string;
}