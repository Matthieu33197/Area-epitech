import * as React from 'react';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import { CreateBoxesActions, CreateBoxesReactions  } from "./createBoxes"
import Button from "@mui/material/Button";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Adresse from '../../App';

export var InfosActions = [];
export var InfosReactions = [];
export var AreaName;

export function CreateArea() {
    const { state } = useLocation();
    let returnResult = state;
    const [errorMessage, setErrorMessage] = React.useState("");
    const [status, setStatus] = useState(undefined);


    if (returnResult !== null)  {
        if (returnResult.ResultArray[0] === "actions")  {
            InfosActions = returnResult.ResultArray;
        }
        if (returnResult.ResultArray[0] === "reactions")  {
            InfosReactions = returnResult.ResultArray;

        }
    }
    const handleSubmitArea = event => {
        const mapAction = {

        }
        for (var i = 2; i < InfosActions.length; i += 2)  {
            mapAction[InfosActions[i]] = InfosActions[i + 1];
        }
        const mapReaction = {

        }
        for (var j = 2; j < InfosReactions.length; j += 2)  {
            mapReaction[InfosReactions[j]] = InfosReactions[j + 1];
        }
        const instance = axios.create({
            withCredentials: true
        });
        instance.post('https://' + Adresse + '/api/v3/update-job', {
            'jobToken': '',
            'name': AreaName,
            'action': InfosActions[1],
            'actionArg': mapAction,
            'reaction': InfosReactions[1],
            'reactionArg': mapReaction,
            'interval': 10,
            'runNow': 'true'
        },)
            .then(function (response) {
                if (response.status === 200) {

                    setStatus({ type: 'success', infos: 'Area successfully created !' });
                } else {
                    setStatus({ type: 'success', infos: 'Error when trying to create the AREA !' });

                }
            })
        setStatus({ type: 'success', infos: 'Area successfully created !' });

        InfosActions = [];
        InfosReactions = [];
        AreaName = "";
    };
    function handleClickSubmit() {
        if (AreaName === "") {
            setErrorMessage("You need to give a name to your area")
        }
        else if (InfosActions === [] || InfosReactions === []) {
            setErrorMessage("You need to fill 'IF THIS' and 'THEN THAT' boxes !")
        }
        else {
            handleSubmitArea();
        }
    }
    const handleChangeAreaName = e => {
        AreaName = e.target.value;
    }

    return (
        <Grid container justify="center" alignItems="center" marginTop="2%" direction="column" spacing={2}>
            {status?.type === 'success' && <Typography color={"#008000"}>{status.infos}</Typography>}
            {status?.type === 'error' && <Typography color={"#FF0000"}>{status.infos}</Typography>}
            <Grid item>
                {errorMessage && <Grid item><Typography variant="h7" color="red">{errorMessage}</Typography></Grid>}
            </Grid>
            <Grid item>
                <Typography variant="h3" color="black">CREATE YOUR AREA</Typography>
            </Grid>
            <Grid item marginBottom="3%">
                <TextField id="outlined-search" value={AreaName} onChange={handleChangeAreaName} label="Area Name" type="search" />
            </Grid>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={5} marginBottom="4%">
                <Grid item>
                    <CreateBoxesActions InfosActions={InfosActions}/>
                </Grid>
                <Grid item>
                    <CreateBoxesReactions InfosReactions={InfosReactions}/>
                </Grid>
            </Grid>
            <Grid item>
                <Button variant="contained" size="medium" onClick={handleClickSubmit}>Submit</Button>
            </Grid>
        </Grid>
    );
}