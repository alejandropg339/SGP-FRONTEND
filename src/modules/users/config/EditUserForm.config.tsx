import { emailFormatValidation, numeric, requiredField, onlyLetter, passwordFormatValidation } from "../../../commons/helpers/FormValidations";
import * as Yup from 'yup';

export const EditUserFormValidations = Yup.object({
    name: Yup.string().matches(onlyLetter.value, onlyLetter.message).required(requiredField),
    lastName: Yup.string().matches(onlyLetter.value, onlyLetter.message).required(requiredField),
    personalEmail: Yup.string().trim().matches(emailFormatValidation.value, emailFormatValidation.message).required(requiredField),
    phone: Yup.string().matches(numeric.value, numeric.message).required(requiredField),
    role: Yup.string().required(requiredField),
    password: Yup.string().trim().matches(passwordFormatValidation.value, passwordFormatValidation.message)
});