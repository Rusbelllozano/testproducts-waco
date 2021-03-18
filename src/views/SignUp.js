import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import initFirebase  from '../database'
import { makeStyles } from '@material-ui/core/styles';

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
      width:300,
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
const SignUp = ({ history }) => {
  const classes = useStyles();
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await initFirebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div className={classes.container}>
            <Card className={classes.root}>
            <form className={classes.form} onSubmit={handleSignUp}>
                <h3>Sign in-TestProduct Waco</h3>
                <FormControl>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input name="email" type="text" placeholder="Email" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" placeholder="Password" />
                </FormControl>
                <FormControl  className={classes.Actionbutton}>
                    <Button type="submit" variant="contained" color="primary">
                        Sign In
                    </Button>
                    <Link style={{ textAlign:'center',textDecoration: 'none', color:'#ff4a4a' }} to="/login">Already has an account Account?</Link>
                </FormControl>
            </form>
        </Card>
        </div>
  );
};

export default withRouter(SignUp);