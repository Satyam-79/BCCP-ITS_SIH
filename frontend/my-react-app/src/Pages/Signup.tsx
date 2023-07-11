import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
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

export default function Signup() {
  const navigate = useNavigate();
  type Signup = {
    
    usertype: String;
    email: String;
    password: String;
  };

  const [signupData, setSignupData] = React.useState<Signup>({
   
    usertype: "",
    email: "",
    password: ""
  });
  console.log(signupData);
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password")
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar
            sx={{
              m: 1,
              backgroundImage:
                "linear-gradient(to right top, #3b8efc, #5e86fa, #7a7df6, #9273ef, #a768e6, #9974f0, #8a7ff8, #7a89ff, #20a4ff, #00baff, #00cbfd, #12daec)"
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={signupData.email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setSignupData({
                      ...signupData,
                      email: e.target.value
                    });
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={signupData.password}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setSignupData({
                      ...signupData,
                      password: e.target.value
                    });
                  }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Select User
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={signupData.usertype}
                    onChange={(e) => {
                      setSignupData({
                        ...signupData,
                        usertype: e.target.value
                      });
                    }}
                    autoWidth
                    label="Select User"
                  >
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Supplier">Supplier</MenuItem>
                    <MenuItem value="Laboratory">Laboratory</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: " #5e86fa" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={() => {
                    navigate("signin");
                  }}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
