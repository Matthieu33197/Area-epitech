import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
//import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from "axios";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie";

import Button from '@mui/material/Button';
import { Satellite, SettingsInputAntennaTwoTone } from '@mui/icons-material';



const cookies = new Cookies();
let cookie = cookies.get('AREA');
  

export function ProductCard ({ product, data, ...rest }){
  useEffect(() => {
    
    console.log(product);
    
},[product])
  const[isChecked, setisChecked] = useState(product.subscribe);
  const [refresh, setrefresh] = useState(false);
  console.log(product);
  
  

  const handleChange = (event) => {
    setisChecked(event.target.checked);
    stopAgivenjob(cookie);
  };
  
    const stopAgivenjob = async (cookie) => {
    const instance = axios.create({
      withCredentials: true
  });
    instance.post('https://area.hik-up.fr/api/v3/stop-job', {
      "jobToken": product.token,
      "stop": isChecked
  },{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie
      }, withCredentials: true,
    })
    .then(res => {
      console.log(res.data);
  });
}


  const deleteArea = async (cookie) => {
    const instance = axios.create({
      withCredentials: true
  });
    instance.post('https://area.hik-up.fr/api/v3/delete-job', {
      "jobToken": product.token,
  },{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie
      }, withCredentials: true,
    })
    .then(res => {
      console.log(res.data);
      setrefresh(true);
  });


  }
  if (refresh === false)
  return(
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
    <Button variant="outlined" color="error"
      onClick={() => {
        deleteArea(cookie);
      }}>
        Delete
        
      </Button>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >

        <Avatar
          alt="Product"
          src={product.media}
          variant="square"
        />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {product.title}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {product.description}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
      <Stack spacing={3}>
        
{/*         <TimePicker
          ampm={false}
          openTo="hours"
          views={['minutes', 'seconds']}
          inputFormat="mm:ss"
          mask="__:__"
          label="Interval"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
      </Stack>
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
          <FormControlLabel 
          label="On/Off"
          control={<Switch checked={isChecked} onChange={handleChange} />} />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
  );
  else
  return;
}

