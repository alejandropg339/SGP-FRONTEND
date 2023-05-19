import { emailFormatValidation, mustMatch, numeric, passwordFormatValidation, requiredField, onlyLetter, minLength, maxLength } from "../../../commons/helpers/FormValidations";
import { EnrollmentFormInterface } from "../interfaces/EnrollmentForm.interface";
import * as Yup from 'yup';

export const EnrollmentInitialValues: EnrollmentFormInterface = {
    numberId: '',
    code: '',
    email: '',
    name: '',
    lastName: '',
    phone: '',
    personalEmail: '',
    password: '',
    confirmPassword: '',
    program: '',
}

export const enrollmentFormValidations = Yup.object({
    numberId: Yup.string().matches(numeric.value, numeric.message).min(6, minLength(6).message).max(6, maxLength(6).message).required(requiredField),
    code: Yup.string().matches(numeric.value, numeric.message).required(requiredField),
    name: Yup.string().matches(onlyLetter.value, onlyLetter.message).required(requiredField),
    lastName: Yup.string().matches(onlyLetter.value, onlyLetter.message).required(requiredField),
    email: Yup.string().trim().matches(emailFormatValidation.value, emailFormatValidation.message).required(requiredField),
    personalEmail: Yup.string().trim().matches(emailFormatValidation.value, emailFormatValidation.message).required(requiredField),
    phone: Yup.string().matches(numeric.value, numeric.message).min(10, minLength(10).message).max(10, maxLength(10).message).required(requiredField),
    password: Yup.string().trim().matches(passwordFormatValidation.value, passwordFormatValidation.message).required(requiredField()),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], mustMatch).required(requiredField),
    program: Yup.string().required(requiredField),
});

