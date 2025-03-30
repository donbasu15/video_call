import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar } from "@mui/material";
import { AuthContext } from "../contexts/authContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [password, setPassword] = React.useState("");

  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("ss");

  const [error, setError] = React.useState("");

  const { handleLogin, handleRegister } = React.useContext(AuthContext);
  let handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (formState === 0) {
        console.log(formState);
        let result = await handleLogin(username, password);
        console.log("logged in");
        setMessage(result.data.message);
        setOpen(true);
        setError("");
        setPassword("");
        setUsername("");
      }
      if (formState === 1) {
        console.log(formState);
        let result = await handleRegister(name, username, password);
        console.log("Registered");

        setMessage(result);
        setOpen(true);
        setError("");
        setPassword("");
        setUsername("");
        setName("");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <div>
              <Button
                variant={formState === 0 ? "contained" : ""}
                onClick={() => setFormState(0)}
              >
                SIGN IN
              </Button>
              <Button
                variant={formState === 1 ? "contained" : ""}
                onClick={() => setFormState(1)}
              >
                SIGN UP
              </Button>
            </div>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              {formState === 1 ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={name}
                  id="username"
                  label="Fullname"
                  name="username"
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                ""
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                value={username}
                id="username"
                label="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={password}
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p style={{ color: "red" }}>{error}</p>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Sign In" : "Register"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
