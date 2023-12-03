// components/Auth/SignupForm.tsx
import { Button, Input, ScreenBackground } from '@frontend/components';
import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  CenteredContainer,
  StyledForm,
} from '../../../shared/components/styled.components';
import { ToggleThemeComponent } from '../../../shared/components/toggleTheme.component';
import { useModeContext } from '../../../shared/hooks/useThemeMode';
import { signup } from '../../../shared/services/signupService';
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
  usernameValidation,
} from '../../../shared/validation/validationRules';

interface SignupFormProps {}

interface SignupInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC<SignupFormProps> = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<SignupInput>({
    mode: 'onChange', // Enable onChange validation
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupInput> = async (data: SignupInput) => {
    // Handle signup logic
    try {
      // Handle signup logic
      const response = await signup(data.username, data.email, data.password);

      // Check the response and display an alert
      if (response.ok) {
        alert('¡Registro exitoso!'); // Change this message as needed
      } else {
        alert(`Algo falló en el registro.`); // Display the error message
      }
    } catch (error) {
      alert(
        'Un error inesperado ha ocurrido durante el registro, intente de nuevo.'
      ); // Display a generic error message
    }
  };

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState<boolean>(true);

  const changePasswordStatus = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setPasswordVisibility((passwordVisibility) => !passwordVisibility);
  };

  const changeConfirmPasswordStatus = (): void => {
    setConfirmPasswordVisibility(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (confirmPasswordVisibility) => !confirmPasswordVisibility
    );
  };

  const redirectToLogin = (): void => {
    navigate('/'); // Redirect to the signup page
  };

  const { mode } = useModeContext();

  const password = watch('password'); // Watch the 'password' field

  return (
    <ScreenBackground>
      <ToggleThemeComponent />
      <CenteredContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h2">Registro</Typography>

          <Input
            name="username"
            label="Nombre de usuario"
            control={control}
            rules={usernameValidation}
            mode={mode}
          />

          <Input
            name="email"
            label="Email"
            control={control}
            rules={emailValidation}
            mode={mode}
          />

          <Input
            name="password"
            label="Contraseña"
            control={control}
            rules={passwordValidation}
            ispassword={true} // Set to true for password fields
            passwordVisibility={passwordVisibility}
            changePasswordStatus={changePasswordStatus}
            mode={mode}
          />

          <Input
            name="confirmPassword"
            label="Confirmar contraseña"
            control={control}
            rules={{
              required: 'Debe confirmar la contraseña',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              validate: (value: any) =>
                confirmPasswordValidation(value, password),
            }}
            ispassword={true} // Set to true for password fields
            passwordVisibility={confirmPasswordVisibility}
            changePasswordStatus={changeConfirmPasswordStatus}
            mode={mode}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
            label="Regístrate"
            sx={{ marginTop: '20px' }}
          />
        </StyledForm>

        <Button
          onClick={redirectToLogin}
          variant="contained"
          label="¿Ya tienes una cuenta? Inicia sesión"
        />
      </CenteredContainer>
    </ScreenBackground>
  );
};

export default SignupForm;
