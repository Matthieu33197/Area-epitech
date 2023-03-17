import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Adresse from '../../App';

export function Register() {
  console.log("test")
    const navigate = useNavigate();
    const handleSubmit = event => {
        const formData = new FormData(event.currentTarget);
        // fetch('http://4.233.102.205:8080/api/v3/register', {
        //   method: "POST",
        //   body: JSON.stringify({
        //     "username": formData.get('username'),
        //     "email": formData.get('email'),
        //     "password": formData.get('password')
        //   }), headers:{
        //     "content-type": "application/json"
        // }
        // })
        //   .then((response) => {
        //     console.log(response);
        //     if (
        //       response.status === 200) {
        //       navigate("/login");
        //     } else {
        //       console.log(response.status);
        //       navigate("/register");
        //   }})
        //   .catch((err) => {
        //     console.log(err);
        //   });
        axios.post('https://' + Adresse + '/api/v3/register', {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        })
        .then(function (response) {
            if (response.status === 200) {
                navigate("/login");
            } else {
                console.log(response.status);
                navigate("/register");
            }
        })
        .catch(function (error) {
            navigate("/register");
        });
          console.log("test2")
    };
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar src= "https://i.kym-cdn.com/photos/images/original/002/130/664/c12.jpg" sx={{ m: 1, bgcolor: 'lightblue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,color: "white", backgroundColor: "black", ':hover': {
                bgcolor: 'grey',
                color: 'white',
              },}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}