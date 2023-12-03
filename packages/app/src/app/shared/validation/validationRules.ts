// validationRules.ts
// Archivo que contiene las validaciones que se le pasaron a los inputs de login y registro, para asegurarse de que los datos tengan el formato correcto.
export const usernameValidation = {
  required: 'El nombre de usuario es obligatorio',
  maxLength: {
    value: 20,
    message: 'El nombre de usuario no puede exceder los 20 caracteres',
  },
};

export const emailValidation = {
  required: 'Email es requerido',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: 'Correo no válido',
  },
};

export const passwordValidation = {
  required: 'Contraseña es requerida',
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    message:
      'La contraseña debe contener un caracter en mayúscula, minúscula y un número',
  },
  minLength: {
    value: 8,
    message: 'La contraseña debe contener al menos 8 caracteres',
  },
};

export const confirmPasswordValidation = (
  value: string,
  password: string
): boolean | string => value === password || 'Las contraseñas no coinciden';
