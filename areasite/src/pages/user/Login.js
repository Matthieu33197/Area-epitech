import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {useEffect} from "react";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Adresse from '../../App';

export function Login({ setToken }) {
  const navigate = useNavigate();
  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const instance = axios.create({
      withCredentials: true
    });

    instance.post('https://' + Adresse + '/api/v3/authenticate', {
      email: formData.get('email'),
      password: formData.get('password')
    },)
      .then(function (response) {
          console.log(response.status);
        if (response.status === 200) {
          console.log(response);
          setToken(response);
          navigate("/CreateArea");
        } else {
          navigate("/login");
        }
      })
      .catch(function (error) {
        navigate("/login");
      });
    event.preventDefault();
  };

  const onSuccess = res => {
    const instance = axios.create({
    });
    instance.post('https://' + Adresse + '/api/v3/google-auth', {
      "access_token": res.xc.access_token,
      "refresh_token": ""
    },)
      .then(function (response) {
        if (response.status === 200) {
          setToken(response);
          navigate("/CreateArea");
        } else {
          navigate("/login");
        }
      })
      .catch(function (error) {
        navigate("/login");
      });
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };

  const clientId = '810716893898-1rut2g2moomhua5h6tgnrq49nk3ijc3s.apps.googleusercontent.com';

useEffect(() => {
   const initClient = () => {
         gapi.client.init({
         clientId: clientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);
});
  
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar src= "https://i1.sndcdn.com/artworks-zOZvV4MMc81yl1gP-NkJYLw-t500x500.jpg" sx={{ m: 1, bgcolor: 'blue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white", backgroundColor: "black", ':hover': {
                bgcolor: 'grey',
                color: 'white',
              },}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
              <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
                <Link href="register" variant="body2" sx={{ ml: 2 }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://i.pinimg.com/736x/9a/fd/cf/9afdcf1c97ced76d8035c9bbb891fa79.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

