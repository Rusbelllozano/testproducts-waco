import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from './views/Home'
import Login from './views/Login'
import SignUp from './views/SignUp'
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./auth";
function App() {

  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
