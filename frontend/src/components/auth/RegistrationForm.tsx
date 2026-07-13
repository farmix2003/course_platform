import {
  EmailOutlined,
  LockOutlined,
  PersonOutlineRounded,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  getApiErrorMessage,
  getApiFieldErrors,
  registerUser,
  saveSession,
} from "../../api/service";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../schemas/authSchemas";
import type {
  RegisterRequest,
  UserResponse,
} from "../../types/auth";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
    },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: (response) => {
      const user: UserResponse = {
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        role: response.role,
      };

      saveSession(
        response.accessToken,
        user,
      );

      navigate("/courses", {
        replace: true,
      });
    },
    onError: (error) => {
      const fields = getApiFieldErrors(error);
      const names = ["firstName", "lastName", "email", "password"] as const;
      names.forEach((name) => {
        if (fields[name]) setError(name, { message: fields[name] });
      });
    },
  });

  const onSubmit = (
    values: RegisterFormValues,
  ) => {
    const request: RegisterRequest = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
    };

    registerMutation.mutate(request);
  };

  const passwordAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label={
          showPassword
            ? "Hide password"
            : "Show password"
        }
        edge="end"
        onClick={() =>
          setShowPassword((current) => !current)
        }
      >
        {showPassword ? (
          <VisibilityOffOutlined />
        ) : (
          <VisibilityOutlined />
        )}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Stack
      component="form"
      spacing={2.2}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {registerMutation.isError && (
        <Alert severity="error">
          {getApiErrorMessage(
            registerMutation.error,
          )}
        </Alert>
      )}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
      >
        <TextField
          {...register("firstName")}
          label="First name"
          autoComplete="given-name"
          autoFocus
          fullWidth
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineRounded color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          {...register("lastName")}
          label="Last name"
          autoComplete="family-name"
          fullWidth
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineRounded color="action" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <TextField
        {...register("email")}
        label="Email address"
        type="email"
        autoComplete="email"
        fullWidth
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined color="action" />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        {...register("password")}
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        fullWidth
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined color="action" />
              </InputAdornment>
            ),
            endAdornment: passwordAdornment,
          },
        }}
      />

      <TextField
        {...register("confirmPassword")}
        label="Confirm password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        fullWidth
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined color="action" />
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={registerMutation.isPending}
        sx={{
          py: 1.4,
          fontWeight: 800,
        }}
      >
        {registerMutation.isPending ? (
          <CircularProgress
            size={24}
            color="inherit"
          />
        ) : (
          "Create account"
        )}
      </Button>
    </Stack>
  );
}
