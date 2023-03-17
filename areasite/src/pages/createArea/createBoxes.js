import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export const CreateBoxesActions = ({ InfosActions }) => {
    const navigate = useNavigate();


    function goToActionOrReaction() {
            navigate("/CreateArea/ChooseService", {state: {ActionOrReaction: "actions"}})
            // Go to choose service of Action OR Reaction
    }
    return(

        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{
                width: 300,
                height: 150,
                backgroundColor: '#212121',
                borderRadius: '16px'
            }}
        >
            <Grid container justify="center" alignItems="center" direction="column" marginTop="2%" spacing={3}>
                <Grid item>
                    <Typography color='white'>IF THIS</Typography>
                </Grid>
                <Grid item>
                    {InfosActions.length === 0 ?
                <Button variant="contained" size="medium" onClick={goToActionOrReaction} >Add</Button> :
                        <Typography color='white'>{InfosActions[1]}</Typography>
                    }
                </Grid>
            </Grid>
        </Box>
    );
}

export const CreateBoxesReactions = ({ InfosReactions }) => {
    const navigate = useNavigate();

    function goToActionOrReaction() {
        navigate("/CreateArea/ChooseService", {state: {ActionOrReaction: "reactions"}})
        // Go to choose service of Action OR Reaction
    }
    return(

        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{
                width: 300,
                height: 150,
                backgroundColor: '#212121',
                borderRadius: '16px'
            }}
        >
            <Grid container justify="center" alignItems="center" direction="column" marginTop="2%" spacing={3}>
                <Grid item>
                    <Typography color='white'>THEN THAT</Typography>
                </Grid>
                <Grid item>
                    {InfosReactions.length === 0 ?
                        <Button variant="contained" size="medium" onClick={goToActionOrReaction} >Add</Button> :
                        <Typography color='white'>{InfosReactions[1]}</Typography>
                    }
                </Grid>
            </Grid>
        </Box>
    );
}