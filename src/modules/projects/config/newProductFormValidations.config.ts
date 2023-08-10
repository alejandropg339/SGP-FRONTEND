import { NewProductFormInterface } from '../interfaces/product.interface';
import { requiredField } from './../../../commons/helpers/FormValidations';
import * as Yup from 'yup';

export const newProductInitialValues: NewProductFormInterface = {
    name: '',
    productType: '',
    link: '',
    file: ''
}

export const newProductFormValidations = Yup.object({
    name: Yup.string().required(requiredField),
    productType: Yup.string().required(requiredField),
    link: Yup.string(),
    file: Yup.mixed(),
});
