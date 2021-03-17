import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import initFirebase from '../database/index'
import { AuthContext } from "../auth";
import { makeStyles } from '@material-ui/core/styles';
import { GitHub } from "@material-ui/icons";
import {
    Input,
    Button,
    Card,
    FormControl,
    FormHelperText,
    InputLabel,
    Icon
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        'display': 'flex',
        'flex-direction': 'column',
        padding: '10px',
    },
    form: {
        width:400,
        padding: '20px',
        'display': 'flex',
        'flex-direction': 'column'
    },
    container:{
        'display':'grid',
        'justify-content':'center'
    },
    Actionbutton:{
        'display':'grid',
        'gap':'10px',
        padding:'5px'
      }
});
// const providerGitHub = initFirebase.auth.GithubAuthProvider();
//     const providerGoogle = new initFirebase.auth.GoogleAuthProvider()
// const handleExternalLogin = 
//         ()=>{
//             alert('Ya casi va a estar')
            // initFirebase
            //         .auth().signInWithPopup(providerGoogle).then((res) => {
            //     console.log(res.user)
            //   }).catch((error) => {
            //     console.log(error.message)
            //   })
        // }
const Login = ({ history }) => {
    const classes = useStyles();
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await initFirebase
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert('No coindicen el usuario y la contraseña');
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }


    return (
        <div className={classes.container}>
            <Card className={classes.root}>
            <form className={classes.form} onSubmit={handleLogin}>
                <h3>Log in -TestProduct Waco</h3>
                <FormControl>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input name="email" type="text" placeholder="Email" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" placeholder="Password" />
                </FormControl>
                <FormControl className={classes.Actionbutton}>
                    <Button type="submit" variant="contained" color="primary">
                        Log In
                    </Button>
                    <Button color="secondary" variant="outlined">
                        <Link style={{ textDecoration: 'none', color:'#000' }} to="/signup">Create an Account</Link>
                        
                    </Button>
                </FormControl>
            </form>
            <Button color="primary" variant="outlined">
                LogIn With Google
            </Button>
            <Button color="primary" variant="outlined">
                LogIn With GitHub 
                <Icon component={GitHub}></Icon>
            </Button>
        </Card>
        </div>
    );
};

export default withRouter(Login);