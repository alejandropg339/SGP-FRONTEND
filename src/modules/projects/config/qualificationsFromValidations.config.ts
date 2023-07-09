import { AddQualificationFormInterface } from '../interfaces/addQualificationForm.interface';
import { requiredField, numeric } from './../../../commons/helpers/FormValidations';
import * as Yup from 'yup';

export const addQualificationInitialValues: AddQualificationFormInterface = {
    qualification: '',
    retrospective: '',
    conclusions: ''
}

export const addQualificationFormValidations = Yup.object({
    qualification: Yup.string().matches(numeric.value, numeric.message).required(requiredField),
    retrospective: Yup.string().required(requiredField),
    conclusions: Yup.string().required(requiredField),
});
