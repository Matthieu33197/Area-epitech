import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Cookies from "universal-cookie";
import Adresse from '../../App';

const DisplayLogos = (services, ActionOrReaction, navigate) => {

    function handleClick(service, ActionOrReaction) {
        console.log(service);
        navigate("/CreateArea/ChooseService/ChooseActionReaction", {state: {service: service, ActionOrReaction: ActionOrReaction}})
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: 500,
                borderRadius: 1,
                gap: 3,
            }}>
            {services.map(p => {
                if (p.subscribed === true)
                    return (<img key={p.service} onClick={() => handleClick(p.service, ActionOrReaction)} style={{ width: 150, height: 150 }} src={"data:image/png;base64," + p.logo} alt={"Error loading " + p.service + " logo"} />)
                else {
                    return null;
                }
            })}
        </Box>

    )
}

export function ChooseService() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    let ActionOrReaction = state;
    const cookies = new Cookies();
    let cookie = cookies.get('AREA');

    const getServices = async () => {
        try {
            await axios.get('https://' + Adresse + '/api/v3/get-user-sub-services', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': cookie
                }, withCredentials: true,
            }).then(res => {
                setServices(res.data.services);
            });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
            getServices();
    }, [])
    return (
        <Box display="flex"
             alignItems="center"
             flexDirection="column"
             marginTop={5}>
            <Typography variant="h3" color="black" marginBottom="5%">CHOOSE YOUR SERVICE</Typography>
            {loading ? (DisplayLogos(services, ActionOrReaction, navigate)) : <CircularProgress />}
        </Box>
    );
}