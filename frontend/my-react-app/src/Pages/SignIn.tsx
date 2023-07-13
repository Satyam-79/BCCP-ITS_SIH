import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AxiosResponse } from "axios";


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

export default function SignIn() {
  // const [requestToken, setrequestToken] = React.useState();

  const [redata, setRedata] = React.useState();

  const [user, setuser] = React.useState({
    username: "",
    password: ""
  });


  const navigate = useNavigate();
  interface UserData {
    username: string;
    password: string;
  }
  
  interface ResponseData {
    access: string;
    // Add other properties of the response if applicable
  }
  
  // Assuming user and navigate are properly defined
  const loginHandler = async () => {
    const requestData: UserData = {
      username: String(user.username),
      password: String(user.password)
    };
  
    try {
      const res: AxiosResponse<ResponseData> = await axios.post("https://bccp.onrender.com/login", requestData);
      localStorage.setItem("token", res.data.access);
      await handleGetRequest();
      setuser(res.data);
      setRedata(res.data);
      user_type_check();
   
    } catch (err) {
      console.log(err);
    }
  }

  const user_type_check = () =>{
   const type =  localStorage.getItem("user_type");
   console.log(type);
   
   if(type === "S"){
    navigate("/supplier");
   }else if(type === "C"){
    navigate("/customer");
   }else if(type === "L"){
    navigate("/lab");
   }else {
    navigate("/signin");
   }
  }

  const handleGetRequest = async () => {
    try {
      const token = String(localStorage.getItem("token"))
        const response:AxiosResponse<ResponseData, any> = await axios.get(`https://bccp.onrender.com/get_user_type`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Set the appropriate content type for your request
        }
      });
      
      localStorage.setItem("user_type", response.data.user_type);
    } catch (error) {
      // Handle any errors
      console.error(error);
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
            borderRadius: "5px",
            alignItems: "center",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            padding: "20px"
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
            Sign in
          </Typography>
          <Box
            component="form"
            // onSubmit={loginhandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={user.username}
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setuser({
                  ...user,
                  username: e.target.value
                });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={user.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setuser({
                  ...user,
                  password: e.target.value
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              // type="submit"
              fullWidth
              onClick={loginHandler}
              variant="contained"
              sx={{ mt: 3, mb: 2, background: " #5e86fa" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  onClick={() => {
                    navigate("/");
                  }}
                  variant="body2"
                  style={{cursor:"pointer"}}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
