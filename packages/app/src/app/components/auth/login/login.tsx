// components/Auth/LoginForm.tsx
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
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';
import { useModeContext } from '../../../shared/hooks/useThemeMode';
import { login } from '../../../shared/services/loginService';
import {
  emailValidation,
  passwordValidation,
} from '../../../shared/validation/validationRules';

interface LoginFormProps {}

interface LoginInput {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginInput>({
    mode: 'onChange',
  });

  const { mode } = useModeContext();

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedToken, setStoredToken] = useLocalStorage('authToken', '');

  const changePasswordStatus = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setPasswordVisibility((passwordVisibility) => !passwordVisibility);
  };

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    try {
      const response = await login(data.email, data.password);

      // Check the response and display an alert
      if (response.ok) {
        alert('¡Login exitoso!'); // Change this message as needed
        const responseBody = await response.json();
        const { token } = responseBody;

        // Save token in localStorage
        if (token) {
          // Replace 'authToken' with your preferred key
          setStoredToken(token);
          window.location.reload();
        }
      }
    } catch (error) {
      alert('Login incorrecto, verifica el usuario o el correo.');
    }
  };

  const redirectToSignup = (): void => {
    navigate('/signup');
  };

  return (
    <ScreenBackground>
      <ToggleThemeComponent />
      <CenteredContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h2">Login</Typography>

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

          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
            label="Iniciar sesión"
            sx={{ marginTop: '20px' }}
          />
        </StyledForm>

        <Button
          onClick={redirectToSignup}
          variant="contained"
          label="¿No tienes una cuenta? Regístrate"
        />
      </CenteredContainer>
    </ScreenBackground>
  );
};

export default LoginForm;
