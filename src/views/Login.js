import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from 'firebase/app';
import { Link } from "react-router-dom";
import initFirebase from '../database/index'
import { AuthContext } from "../auth";
import { makeStyles } from '@material-ui/core/styles';
import { GitHub, AccountCircle } from "@material-ui/icons";
import {
    Input,
    Button,
    Card,
    FormControl,
    FormHelperText,
    InputLabel,
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        'display': 'flex',
        'flex-direction': 'column',
        padding: '10px',
    },
    form: {
        width: 300,
        padding: '20px',
        'display': 'flex',
        'flex-direction': 'column'
    },
    container: {
        'display': 'grid',
        'justify-content': 'center'
    },
    Actionbutton: {
        'display': 'grid',
        'gap': '10px',
        padding: '5px'
    }
});
const providerGitHub = new firebase.auth.GithubAuthProvider();
const providerGoogle = new firebase.auth.GoogleAuthProvider()

const Login = ({ history }) => {
    const classes = useStyles();
    const handleExternalLoginGitHub =
        () => {
            initFirebase
                .auth().signInWithPopup(providerGitHub).then((res) => {
                    console.log(res.user)
                    history.push("/");
                }).catch((error) => {
                    console.log(error.message)
                })
        }
    const handleExternalLogin =
        () => {
            initFirebase
                .auth().signInWithPopup(providerGoogle).then((res) => {
                    console.log(res.user)
                    history.push("/");
                }).catch((error) => {
                    console.log(error.message)
                })
        }
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
                alert('It does not match our records');
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
                            <Link style={{ textDecoration: 'none', color: '#000' }} to="/signup">Create an Account</Link>
                        </Button>
                    </FormControl>
                </form>
                <Button startIcon={<AccountCircle />} onClick={handleExternalLogin} color="primary" variant="outlined">
                    LogIn With Google
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<GitHub />}
                    onClick={handleExternalLoginGitHub}
                >
                    LogIn With GitHub
                </Button>
            </Card>
        </div>
    );
};

export default withRouter(Login);