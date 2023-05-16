import { emailFormatValidation, numeric, requiredField, onlyLetter } from "../../../commons/helpers/FormValidations";
import { MyAccountFormInterface } from "../interfaces/MyAccountForm.interface";
import * as Yup from 'yup';

export const MyAccountInitialValues: MyAccountFormInterface = {
    name: '',
    lastName: '',
    phone: '',
    personalEmail: '',
}

export const MyAccountFormValidations = Yup.object({
    name: Yup.string().matches(onlyLetter.value, onlyLetter.message).required(requiredField),
    lastName: Yup.string().matches(onlyLetter.value, onlyLetter.message).required(requiredField),
    personalEmail: Yup.string().trim().matches(emailFormatValidation.value, emailFormatValidation.message).required(requiredField),
    phone: Yup.string().matches(numeric.value, numeric.message).required(requiredField),
});

