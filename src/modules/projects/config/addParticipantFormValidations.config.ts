import * as Yup from 'yup';
import { requiredField } from '../../../commons/helpers/FormValidations';

export const newParticipantFormValidations = Yup.object({
    id: Yup.string().required(requiredField),
    role: Yup.string().required(requiredField),
});