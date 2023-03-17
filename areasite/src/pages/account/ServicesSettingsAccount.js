import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Card from '@mui/material/Card';
import Avatar from "@mui/material/Avatar";
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {AreaName, InfosActions, InfosReactions} from "../createArea/createArea";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Adresse from '../../App';

export function ServicesSettingsAccount() {
    const cookies = new Cookies();
    let cookie = cookies.get('AREA');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getServices = async () => {
        try {
            axios.get('https://' + Adresse + '/api/v3/get-user-sub-services', {
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
    const changeSubscribedService = async (e, service, subscribed, setSubscribed, cookie) => {
        const instance = axios.create({
            withCredentials: true
        });
        instance.post('https://' + Adresse + '/api/v3/update-services', {
            "service": service,
            "mobile": false,
            "subscribe": subscribed
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookie
            }
        }).then(res => {
            if (res.status === 200) {
                setSubscribed(subscribed);
            }
        });

    };

    const clientId = '810716893898-1rut2g2moomhua5h6tgnrq49nk3ijc3s.apps.googleusercontent.com';

    useEffect(() => {
        getServices();
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    }, [])
    const onSuccess = (res) => {
        const instance = axios.create({
            withCredentials: true
        });

        instance.post('https://' + Adresse + '/api/v3/update-services', {
            "service": "GOOGLE",
            "subscribe": true,
            "mobile": true,
            "token": res.xc.access_token,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': cookie
            }, withCredentials: true})
            .then(function (response) {
                console.log(response.status);
                if (response.status === 200) {
                    console.log(response);
                } else {
                }
            })
            .catch(function (error) {
            });
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };

    function openLogin() {
        window.open(`https://www.reddit.com/api/v1/authorize?client_id=P_Pt6XOAB1LhUTVmFeSKMw&response_type=code&state=aaaaa&redirect_uri=http://localhost:8081/Account/ServicesSettings/callback&duration=permanent&scope=identity,submit,save`,
            "_self");
    }
    const CardSubService = ({ p, index }) => {
        const [subscribed, setSubscribed] = useState(p.subscribed);

        return (<Card sx={{ minWidth: 300, maxWidth: 300, marginBottom: 5, marginRight: 2}}>
            <CardHeader
                avatar={
                    <Avatar src={"data:image/png;base64," + p.logo} aria-label="recipe" />
                }
                title={p.service}
            />
            <CardContent>
                {p.service === "GOOGLE" ?
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />:
                    p.service === "REDDIT" ? <Button onClick={() => {openLogin()}} style={{
                            borderRadius: 35,
                            backgroundColor: "blue",
                            color: "white"
                        }}>REDDIT</Button> :
                        <FormControlLabel
                            sx={{
                                display: 'block',
                            }}
                            control={
                                <Switch
                                    checked={subscribed}
                                    onChange={event => changeSubscribedService(event, p.service, !subscribed, setSubscribed, cookie)}
                                    name="Subscribed"
                                    color="primary"
                                />
                            }
                            label="Subscribe"
                        />}
            </CardContent>
        </Card>)
    }
    return (
        <Box display="flex"
             alignItems="center"
             flexDirection="column"
             marginTop={5}>
            <Typography variant="h3" color="black">Services settings</Typography>

            {loading === false ? <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    maxWidth: 1000,
                    borderRadius: 1,
                }}
            >
                {data.map((p, index) => {
                    return (
                        <CardSubService p={p} index={index}/>
                    );
                })}
            </Box> : <CircularProgress />}
        </Box>
    );
}