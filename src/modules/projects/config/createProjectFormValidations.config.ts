import { CreateProjectForm } from '../interfaces/createProjectForm.interface';
import { maxLength, minLength, requiredField } from './../../../commons/helpers/FormValidations';
import * as Yup from 'yup';

export const createProjectInitialValues: CreateProjectForm = {
    title: '',
    description: '',
    city: '',
    methodology: '',
    justification: '',
    projectType: '',
    finalDate: '',
    initialDate: '',
    projectStatus: '',
    program: '',
}

export const createProjectFormValidations = Yup.object({
    title: Yup.string().min(6, minLength(6).message).max(45, maxLength(45).message).required(requiredField),
    description: Yup.string().required(requiredField),
    city: Yup.string().required(requiredField),
    methodology: Yup.string().required(requiredField),
    justification: Yup.string().required(requiredField),
    projectType: Yup.string().required(requiredField),
    program: Yup.string().required(requiredField)
});
