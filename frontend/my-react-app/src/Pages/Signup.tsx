import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select } from "@mui/material";

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
    
    user_type: string;
    username: string;
    password: string;
  };

  const [signupData, setSignupData] = React.useState<Signup>({
   
    user_type: "C",
    username: "",
    password: ""
  });

  const signupHandler = async (e:any) => {
    e.preventDefault();
    const requestData: Signup = {
      user_type: signupData.user_type,
      username: signupData.username,
      password: signupData.password
    };
  
    try {
      const res = await axios.post("https://bccp.onrender.com/create_user", requestData);
      // Handle the response as needed
      console.log(res.data);
      // Redirect or perform any necessary actions
      // navigate("/signin");
    } catch (err) {
      console.log(err);
    }
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
          <Typography>Business accreditation and certification platform</Typography>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={signupHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={signupData.username}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setSignupData({
                      ...signupData,
                      username: e.target.value
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
                    User Type
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={signupData.user_type}
                    onChange={(e:any) => {
                      setSignupData({
                        ...signupData,
                        user_type: e.target.value
                      });
                    }}
                    autoWidth
                    label="Select User"
                  >
                    <MenuItem value="C">Customer</MenuItem>
                    <MenuItem value="S">Supplier</MenuItem>
                    <MenuItem value="L">Laboratory</MenuItem>
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
                  style={{cursor:"pointer"}}
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
