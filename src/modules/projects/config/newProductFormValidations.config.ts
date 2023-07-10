import { NewProductFormInterface } from '../interfaces/newProductForm.interface';
import { requiredField } from './../../../commons/helpers/FormValidations';
import * as Yup from 'yup';

export const newProductInitialValues: NewProductFormInterface = {
    name: '',
    description: '',
    file: ''
}

export const newProductFormValidations = Yup.object({
    name: Yup.string().required(requiredField),
    description: Yup.string().required(requiredField),
    file: Yup.mixed().required(requiredField),
});
