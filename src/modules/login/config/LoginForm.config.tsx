import { emailFormatValidation, passwordFormatValidation, requiredField } from "../../../commons/helpers/FormValidations";
import { LoginFormInterface } from "../interfaces/LoginForm.interface";
import * as Yup from 'yup';

export const initialValuesLoginForm: LoginFormInterface = {
    email: undefined,
    password: undefined
};

export const loginFormValidations = Yup.object({
    email: Yup.string().trim().matches(emailFormatValidation.value, emailFormatValidation.message).required(requiredField),
    password: Yup.string().trim().matches(passwordFormatValidation.value, passwordFormatValidation.message).required(requiredField()),
});