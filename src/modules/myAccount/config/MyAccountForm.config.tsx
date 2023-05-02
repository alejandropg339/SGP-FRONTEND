import { emailFormatValidation, numeric, requiredField, onlyLetter, minLength, maxLength } from "../../../commons/helpers/FormValidations";
import { MyAccountFormInterface } from "../interfaces/MyAccountForm.interface";
import * as Yup from 'yup';

export const MyAccountInitialValues: MyAccountFormInterface = {
    name: '',
    lastName: '',
    phone: '',
    personalEmail: '',
    program: '',
}

export const MyAccountFormValidations = Yup.object({
    name: Yup.string().matches(onlyLetter.value, onlyLetter.message).required(requiredField),
    lastName: Yup.string().matches(onlyLetter.value, onlyLetter.message).required(requiredField),
    personalEmail: Yup.string().trim().matches(emailFormatValidation.value, emailFormatValidation.message).required(requiredField),
    phone: Yup.string().matches(numeric.value, numeric.message).required(requiredField),
    program: Yup.string().required(requiredField),
});

