import React from 'react';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from 'universal-cookie';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import Adresse from '../../App';

function DisplayActionOrReactions(ListActionsOrReactions, ActionOrReaction, navigate) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                maxWidth: 2000,
                borderRadius: 1,
            }}
        >
            {ListActionsOrReactions.map((p, index) => {
                var listValueTextField = [];
                var KeyArg = [];
                var DescriptionArg = [];
                for(var i = 0; i < p.args.length; i++) {
                    for (var key in p.args[i]) {
                        listValueTextField.push("");
                        KeyArg.push(key);
                        DescriptionArg.push(p.args[i][key]);
                    }
                }
                const handleChangeTextField = (e, index2) => {
                    listValueTextField[index2] = e.target.value;
                }
                const onClickChoose = e => {
                    var ArrayResult = [];
                    ArrayResult.push(ActionOrReaction);
                    ArrayResult.push(p.name);
                    for (var i = 0; i < KeyArg.length; i++) {
                        ArrayResult.push(KeyArg[i]);
                        ArrayResult.push(listValueTextField[i]);
                    }
                    navigate("/CreateArea/", {state: {ResultArray: ArrayResult}});

                }
              return (
          <Card sx={{ minWidth: 400, maxWidth: 400, marginBottom: 5, marginRight: 2}}>
          <CardContent>
            <Typography variant="h5" component="div">
              {p.name}
            </Typography>
            <Typography variant="body2">
              {p.description}
            </Typography>
              {KeyArg.map((p2, index2) => {
                  return (<TextField
                      id="filled-disabled"
                      margin="normal"
                      required
                      fullWidth
                      onChange={event => handleChangeTextField(event, index2)}
                      label={DescriptionArg[index2]}
                      variant="filled"
                  />);
              })}
          </CardContent>
          <CardActions>
            <Button onClick={onClickChoose} size="small">Choose</Button>
          </CardActions>
        </Card>);
        })}
      </Box>
    )
}

export function ChooseActionReaction() {
    const { state } = useLocation();
    const cookies = new Cookies();
    const navigate = useNavigate();
    let cooki = cookies.get('AREA');
    let service = state.service;
    let ActionOrReaction = state.ActionOrReaction;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getArea = async () => {
        try {
            axios.get('https://' + Adresse + '/api/v3/get-area-available', {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "/",
                    "Cache-Control": "no-cache",
                    'Authorization': cooki
                    }, withCredentials: true,
            })
            .then(res => {
              setData(res.data)
              setLoading(false);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getArea();
    }, [])
    return (
      <Box display="flex"
           alignItems="center"
           flexDirection="column"
           marginTop={5}>

      {loading === false ? (DisplayActionOrReactions(data["services"][service][ActionOrReaction.ActionOrReaction], ActionOrReaction.ActionOrReaction, navigate)) : <CircularProgress />}
        </Box>
    );
      
}