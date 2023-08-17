import * as Yup from 'yup';
import { requiredField } from '../../../commons/helpers/FormValidations';

export const commentsFormValidation = Yup.object({
    comment: Yup.string().required(requiredField),
});