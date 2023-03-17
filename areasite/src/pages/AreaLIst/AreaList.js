import * as React from 'react';

import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from './products';
import { ProductCard } from './product-card';
import axios from "axios";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie";

export function AreaList() {
  const cookies = new Cookies();
  let cookie = cookies.get('AREA');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const getServices = async () => {
      try {
          axios.get('https://area.hik-up.fr/api/v3/get-user-sub-services', {
              headers: {
                  'Content-Type': 'application/json',
                  "Accept": "/",
                  "Cache-Control": "no-cache",
                  'Authorization': cookie
              }, withCredentials: true,
          })
              .then(res => {
                  setData(res.data.services)
                  if (data !== [])
                      setLoading(false);
              });
      } catch (e) {
          console.log(e);
      }
  };
  const changeSubscribedService = async (e, service, cookie) => {
      const instance = axios.create({
          withCredentials: true
      });
        instance.post('https://area.hik-up.fr/api/v3/search-job', {
          
      },{
          headers: {
              'Content-Type': 'application/json',
              'Authorization': cookie
          }
      }).then(res => {
          let cards = [{}];
          if (res.status === 200 && res.data != undefined) {
            console.log(res.data, "toto");
            cards = res.data.job.map((elem, index)=>
            {return({createdAt: Date.now().toString(),
            description: elem.reaction,
            media: "",
            title: elem.name,
            subscribe: elem.is_stoped ? false : true,
            token: elem.jobToken

            });})
            setData(cards)
            if (data !== [])
                setLoading(false);
          }
      });

  }
  useEffect(() => {
      changeSubscribedService();
      
  },[])
    return (
        <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth={false}>
            <Box sx={{ pt: 3 }}>
              <Grid
                container
                spacing={3}
              >
                {data.map((product, index) => (
                  <Grid
                    item
                    key={index}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    <ProductCard product={product} data={data}/>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 3
              }}
            >
              <Pagination
                color="primary"
                count={3}
                size="small"
              />
            </Box>
          </Container>
        </Box>
      </>
    );
}