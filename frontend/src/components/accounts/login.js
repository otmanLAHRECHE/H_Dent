import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
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

import { login_api } from '../../actions/authentification';
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

  const [alert, setAlert] = useState(false);

  const [loginError, setLoginError] = useState(false);


  const [allUsers, setAllUsers] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [doctor, setDoctor] = useState(null);



  const [userNameError, setUserNameError] = useState([])
  const [passwordError, setPasswordError] = useState([])
  const [doctorError, setDoctorError] = useState([])

  const [open, setOpen] = useState(false)


  

  const handleSubmit = async (event) => {
    
    setErrorEmail([false,""])
    setErrorPassword([false,""])
    setAlert(false)
    setOpen(true)

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var email = data.get("email")
    var password = data.get("password")
    var login_state = await login_api(email, password);
  


  };

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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Autocomplete
                                    disablePortal
                                    id="user_id"
                                    value={user}
                                    onChange={(event, newVlue) =>{
                                        
                                    }}
                                    options={allUsers}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} error={userNameError[0]}
                                    helperText={userNameError[1]} fullWidth variant="standard" label="Arrivage" 
                                    required/>}
                                    /> 
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

                      <Autocomplete
                                    disablePortal
                                    id="medic_id"
                                    value={arivage}
                                    onChange={(event, newVlue) =>{
                                        
                                    }}
                                    options={allArivage}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} error={arivageError[0]}
                                    helperText={arivageError[1]} fullWidth variant="standard" label="Arrivage" 
                                    required/>}
                                    /> 

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log in
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>



            {alert ? <Alt type='error' message='Authentification error !!' /> : null}
            
            {loginError ? <Alt type='error' message='Error, verifier les champs...' /> : null}

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