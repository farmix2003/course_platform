import {
  EmailOutlined,
  LockOutlined,
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
  loginUser,
  saveSession,
} from "../../api/service";
import {
  loginSchema,
  type LoginFormValues,
} from "../../schemas/authSchemas";

export default function LoginForm() {
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
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      saveSession(
        response.token,
        response.user,
      );
      
      navigate("/courses", {
        replace: true,
      });
    },
    onError: (error) => {
      const fields = getApiFieldErrors(error);
      if (fields.email) setError("email", { message: fields.email });
      if (fields.password) setError("password", { message: fields.password });
    },
  });

  const onSubmit = (
    values: LoginFormValues,
  ) => {
    loginMutation.mutate({
      email: values.email.trim().toLowerCase(),
      password: values.password,
    });
  };

  return (
    <Stack
      component="form"
      spacing={2.5}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {loginMutation.isError && (
        <Alert severity="error">
          {getApiErrorMessage(
            loginMutation.error,
          )}
        </Alert>
      )}

      <TextField
        {...register("email")}
        label="Email address"
        type="email"
        autoComplete="email"
        autoFocus
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
        autoComplete="current-password"
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

            endAdornment: (
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
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loginMutation.isPending}
        sx={{
          py: 1.4,
          fontWeight: 800,
        }}
      >
        {loginMutation.isPending ? (
          <CircularProgress
            size={24}
            color="inherit"
          />
        ) : (
          "Login"
        )}
      </Button>
    </Stack>
  );
}
