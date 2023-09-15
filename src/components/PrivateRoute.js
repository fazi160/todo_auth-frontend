import React from "react";
import {getLocal} from '../helpers/auth'
import Home from './home/Home'
import Admin from './admin/admin'
import Login from "./login/login";
import jwt_decode from 'jwt-decode'

export function PrivateRoute() {
    let response = getLocal();
    console.log("JWT token:", response);
  
    if (response) {
      const decoded = jwt_decode(response);
      console.log("Decoded token:", decoded);
  
      if (decoded.is_admin) {
        console.log("User is admin");
        return <Admin />; //make it into admin
      } else {
        console.log("User is not admin");
        return <Home />;
      }
    } else {
      console.log("User not authenticated");
      return <Login />;
    }
  }
  