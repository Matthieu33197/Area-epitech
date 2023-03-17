import React, {useEffect, useRef, useState} from 'react';
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Cookies from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import IconButton from '@mui/material/IconButton';
import {Badge} from "@mui/material";
import Button from "@mui/material/Button";
import compress from 'compress-base64';
import { useNavigate } from "react-router-dom";
import Adresse from '../../App';

export function Account() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    let cookie = cookies.get('AREA');
    const [infosAccount, setInfosAccount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [firstname, setfirstname] = React.useState("");
    const [lastname, setlastname] = React.useState("");
    let [avatar, setavatar] = React.useState("");
    const inputRef = useRef(null);
    const [status, setStatus] = useState(undefined);

    const goToServicesSettings = () => {
        navigate("/Account/ServicesSettings")
        // Go to choose service of Action OR Reaction
    }
    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };
    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(fileObj);
        reader.onload = event => {
            compress(event.target.result, {
                width: 400,
                max: 200, // max size
                min: 20, // min size
                quality: 0.2
            }).then(result => {
                setavatar(result.toString());
                avatar = result;
            });
        };
    };

    const changeFirstname = e => {
        setfirstname(e.target.value);
    }
    const changeLastname = e => {
        setlastname(e.target.value);
    }

    const handleClickSave = async (name, lastname, avatar) => {
        await axios.post('https://' + Adresse + '/api/v3/update-user-data', {
            "name": name,
            "lstName": lastname,
            "avatar": avatar
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': cookie
            }, withCredentials: true,
        }).then((res) => {
            if (res.status === 200)  {
                setStatus({ type: 'success', infos: 'Informations sucessfully updated !' });
            }
            else {
                setStatus({ type: 'error', infos: 'Informations can\'t be updated !'});

            }
        })
    };
    const getInfosAccount = async () => {
            await axios.get('https://' + Adresse + '/api/v3/get-user-data', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': cookie
                }, withCredentials: true,
            }).then((res) => {
                setInfosAccount(res.data.user);
                setfirstname(res.data.user.name);
                setlastname(res.data.user.lstName);
                if (avatar === "" && (res.data.user.avatar === null || res.data.user.avatar.indexOf(',') === -1))  {
                    let base64tmp;
                    if (res.data.user.avatar === null)
                        setavatar("");
                    else {

                        base64tmp = res.data.user.avatar;
                        setavatar('data:image/jpg;base64,' + base64tmp);
                    }
                }
                else if (avatar === "" && (res.data.user.avatar.indexOf(',') !== -1)) {
                    let base64tmp;
                    base64tmp = res.data.user.avatar.split(',')[1];
                        setavatar('data:image/jpg;base64,' + base64tmp);
                }
                setLoading(false)
            })
    };
    useEffect(() => {
        getInfosAccount();
    }, [])
    return (
        <Container fixed>
            {loading === false ?
                <Grid container justify="center" alignItems="center" marginTop="2%" direction="column" spacing={4}>
                    {status?.type === 'success' && <Typography color={"#008000"}>{status.infos}</Typography>}
                    {status?.type === 'error' && <Typography color={"#FF0000"}>{status.infos}</Typography>}

                    <Grid item>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <div>
                                    <input
                                        style={{display: 'none'}}
                                        ref={inputRef}
                                        type="file"
                                        onChange={handleFileChange}
                                    />

                                <IconButton onClick={handleClick}>
                                    <AddAPhotoIcon />
                                </IconButton>
                                </div>

                            }
                        >
                            <Avatar
                                src={avatar}
                                sx={{ width: 100, height: 100 }}
                            />
                        </Badge>

                    </Grid>
                    <Grid container direction="row" marginTop="1%" justifyContent="center" spacing={4}>
                        <Grid item>
                            <Typography variant="h6" color="black" marginBottom="0.5%">Email</Typography>
                            <TextField
                                disabled
                                id="filled-disabled"
                                defaultValue={infosAccount.email}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" color="black" marginBottom="0.5%">Username</Typography>
                            <TextField
                                disabled
                                id="filled-disabled"
                                defaultValue={infosAccount.username}
                                variant="filled"
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" marginTop="0.2%" justifyContent="center" spacing={4}>
                        <Grid item>
                            <Typography variant="h6" color="black" marginBottom="0.5%">Firstname</Typography>
                            <TextField
                                id="filled-disabled"
                                onChange={changeFirstname}
                                defaultValue={infosAccount.name}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" color="black" marginBottom="0.5%">Lastname</Typography>
                            <TextField
                                id="filled-disabled"
                                onChange={changeLastname}
                                defaultValue={infosAccount.lstName}
                                variant="filled"
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="medium" onClick={() => handleClickSave(firstname, lastname, avatar)} style={{
                        }}>Save</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="medium" onClick={goToServicesSettings} style={{
                        }}>Services Settings</Button>
                    </Grid>
                </Grid>
                : <CircularProgress />}
        </Container>
    );
}