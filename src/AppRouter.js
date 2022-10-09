import { Box, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from "./App";
import Login from "./Login";
import Signup from './Signup';
// import UserModify from './UserModify';
function Copyright() {
    return (
        <Typography variant='body2' color="textSecondary" align='center'>
            {"Copyright c"}
            songmingyu, {new Date().getFullYear()}
            {"."}
        </Typography>
    )
}

export default class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Routes>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<App />} />
                {/* <Route path="/usermodify" element={<UserModify/>}/> */}
            </Routes>
        </div>
        <div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </div>
      </BrowserRouter>
    )
  }
}