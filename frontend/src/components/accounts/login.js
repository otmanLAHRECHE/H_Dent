import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Navigate} from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';

import { getAllUsersForLogin, login_api } from '../../actions/authentification';
import Alt from '../layouts/alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/otmanLAHRECHE">
         EPSP Djanet H_Dent V1.0 
      </Link>{' '}-- created by otman LAHRECHE 
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {

  const [alert, setAlert] = React.useState(false);
  const [loged, setLoged] = React.useState(false);


  const [loginError, setLoginError] = React.useState(false);

  const [userData, setUserData] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [allDoctors, setAllDoctors] = React.useState([]);
  
  const [user, setUser] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const [doctor, setDoctor] = React.useState(null);

  const [passwordState, setPasswordState] = React.useState(false);
  const [doctorState, setDoctorState] = React.useState(false);



  const [userNameError, setUserNameError] = React.useState([]);
  const [passwordError, setPasswordError] = React.useState([]);
  const [doctorError, setDoctorError] = React.useState([]);
  const [response, setResponse] = React.useState("");

  const [open, setOpen] = React.useState(false);

  React.useEffect( () =>{

    const fetchUsersData = async() =>{
      setUserData(await getAllUsersForLogin());
    }
    fetchUsersData();
  },[])

  React.useEffect( () =>{
    setAllUsers(userData);
  },[userData]);


  const handleSubmit = async () => {

    var test = true;
    
    setUserNameError([false,""]);
    setPasswordError([false,""]);
    setDoctorError([false,""]);

    if (user == null){
      setUserNameError([true, "Chapm est obligatoire"]);
      setLoginError(true);
      test = false;
    }else{
      if(user.id ==1){
        if(password == null || password == ""){
          setPasswordError([true, "Chapm est obligatoire"]);
          setLoginError(true);
          test = false;
        }

        if(test){
          setResponse(await login_api(user.label, password.toString()));
        }
      }else{
        if(doctor == null){
          setDoctorError([true, "Chapm est obligatoire"]);
          setLoginError(true);
          test = false;
        }

        if(test){

        }
      }
    }

  };



  React.useEffect( () =>{

   if(response =="logged"){
    setOpen(true);
    setTimeout(()=>{
      console.log("timeout....")
      setLoged(true);
    }, 2000)

   }else if(response == "error"){
    setAlert(true);

   }
  },[response]);


  


  if (localStorage.getItem("auth_token") && loged == true) {
    console.log("navigate")
    return <Navigate to="/"/>;
  }else{
  return (
    <>
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            H_Dent login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Autocomplete
                                    disablePortal
                                    id="user_id"
                                    value={user}
                                    onChange={(event, newVlue) =>{
                                      setUser(newVlue);
                                      if(newVlue != null){
                                        if(newVlue.id == 1){
                                          setDoctorState(true);
                                          setPasswordState(false);
                                          setPassword("")
                                        }else{
                                          setDoctorState(false);
                                          setPasswordState(true);
                                          setPassword("123456789");
                                        }
                                      }
                                      
                                        
                                    }}
                                    options={allUsers}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} error={userNameError[0]}
                                    helperText={userNameError[1]} fullWidth variant="standard" label="Utilisateur" 
                                    required/>}
                                    /> 
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              disabled={passwordState}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError[0]}
              helperText={passwordError[1]}
              onChange={(event) => {setPassword(event.target.value)}}
            />

                      <Autocomplete
                                    disablePortal
                                    id="medic_id"
                                    value={doctor}
                                    disabled={doctorState}
                                    onChange={(event, newVlue) =>{
                                        
                                    }}
                                    options={allDoctors}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} error={doctorError[0]}
                                    helperText={doctorError[1]} fullWidth variant="standard" label="Medecin dentiste" 
                                    required/>}
                                    /> 

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>



            {alert ? <Alt type='error' message='Authentification error !!' onClose={()=> setAlert(false)} /> : null}
            
            {loginError ? <Alt type='error' message='Error, verifier les champs...' onClose={()=> setLoginError(false)} /> : null}

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>


    

    </>
  );
}
}