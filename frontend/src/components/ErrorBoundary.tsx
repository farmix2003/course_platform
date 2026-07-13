import { Alert, Box, Button, Container, Typography } from "@mui/material";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unexpected UI error", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return <Container maxWidth="sm" sx={{ py: 10 }}><Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>Something went wrong</Typography>
      <Alert severity="error" sx={{ mb: 3 }}>The page could not be displayed. Your data has not been changed.</Alert>
      <Button variant="contained" onClick={() => window.location.assign("/")}>Return home</Button>
    </Box></Container>;
  }
}
