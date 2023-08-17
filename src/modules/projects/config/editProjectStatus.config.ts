import * as Yup from 'yup';
import { requiredField } from '../../../commons/helpers/FormValidations';

export const editStatusFormValidations = Yup.object({
    status: Yup.string().required(requiredField),
});
