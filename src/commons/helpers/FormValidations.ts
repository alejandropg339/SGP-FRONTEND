export const onlyLetter = {
    value: /^[a-zA-Z\u00f1\u00d1\s]+$/,
    message: 'Este campo solo permite ingreso de letras',
};

export const onlyAlphanumeric = {
    value: /^[A-Za-z0-9u\s]+$/,
    message: 'Este campo permite el ingreso de números y letras',
};
export const emailFormatValidation = {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Correo electrónico no es válido',
};

export const passwordFormatValidation = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número',
}

export const numeric = {
    value: /^\d+$/,
    message: 'Este campo solo admite números',
};

export const minLength = (length: number) => ({
    value: length,
    message: `La cantidad mínima de caracteres es ${length}`,
});

export const maxLength = (length: number) => ({
    value: length,
    message: `La cantidad máxima de caracteres es ${length}`,
});


export const uniqueLength = (length: number) => ({
    value: length,
    message: `Este campo debe contener ${length} dígitos`,
});

export const requiredField = () => 'El campo es requerido';

export const mustMatch = 'La clave no coincide. Por favor verifica e inténtalo de nuevo';
