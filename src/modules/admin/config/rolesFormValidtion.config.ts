import * as Yup from 'yup';
import { requiredField } from '../../../commons/helpers/FormValidations';

export const rolesFormValidation = Yup.object({
    roleName: Yup.string().required(requiredField),
    usersRole: Yup.string().required(requiredField),
    programsRole: Yup.string().required(requiredField),
    facultiesRole: Yup.string().required(requiredField),
    eventsRole: Yup.string().required(requiredField),
    projectsRole: Yup.string().required(requiredField),
    hotbedRole: Yup.string().required(requiredField),
    reportsRole: Yup.string().required(requiredField),
});