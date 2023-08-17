import * as Yup from 'yup';
import { requiredField } from '../../../commons/helpers/FormValidations';

export const newParticipantFormValidations = Yup.object({
    userId: Yup.string().required(requiredField),
    role: Yup.string().required(requiredField),
});