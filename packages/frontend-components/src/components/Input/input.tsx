import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const Input: React.FC<any> = (props: any) => {
  const [isLabelShrunk, setIsLabelShrunk] = useState<boolean>(false);

  const onFocusFunction = () => {
    setIsLabelShrunk(true);
  };

  const onBlurFunction = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setIsLabelShrunk(false);
    }
  };

  const propsObj = { ...props }
  delete propsObj.setValue
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={""}
      rules={props.rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          value={value}
          onChange={({ target: { value } }) => {
            onChange(value);
            if (props?.setValue) props.setValue(props.name, value);
          }}
          onFocus={onFocusFunction}
          onBlur={onBlurFunction}
          error={!!error}
          helperText={error ? error.message : ""}
          variant="outlined"
          fullWidth
          type={props.passwordVisibility ? "password" : "text"}
          sx={{ marginTop: '20px',
            '& input': {
              color: props.mode === 'dark' ? '#fff' : 'inherit',
            }
          }}
          InputLabelProps={{ shrink: isLabelShrunk }}
          inputProps={{
            style: {
              border: 0, // Set border to 0 for the input element
            },
          }}
          {...propsObj}
          InputProps={{
            sx: {
              border: 'none', // Remove border for the input element
              '&:before': {
                borderBottom: 'none', // Remove the underline effect
              },
              '&:after': {
                borderBottom: 'none', // Remove the underline effect when focused
              },
            },
            ...(props.ispassword
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={props.changePasswordStatus}
                      >
                        {props.passwordVisibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : {}),
          }}
        />
      )}
    />
  )
}
