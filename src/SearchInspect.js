import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { call,signout } from './service/ApiService';
import {Paper, List, Container, AppBar, Toolbar, Grid, Typography, Button, Input, FormControl, InputLabel, Select, MenuItem, TextField} from "@material-ui/core";
import { Link } from 'react-router-dom';
export default function SearchInspect() {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    useEffect(()=>{
        call(`/computer/inspect?comId=${location.state.comId}`,"GET",null).then((response)=>{console.log(response.data);setData(response.data)});
        call("/auth/modify","GET",null)
            .then((response)=> {
                response.token = localStorage.getItem("ACCESS_TOKEN");
                console.log(response);
                setUser(response);
            });
    },[])
    var navigationBar = (
        <AppBar position="static">
          <Toolbar>
            <Grid justify="space-between" container>
              <Grid item>
                <Link to={"/"} style={{textDecoration:'none',color:'white'}}>
                    <Typography variant="h6">Compu's Combine</Typography>
                </Link>
              </Grid>
              <Grid item>
                반갑습니다. {user.name} 님 &nbsp;
                <Button color='inherit'>logout</Button>
                <Button component={Link} to="/usermodify" color="inherit"> 정보 수정 </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )
    console.log(location.state.comId);
    console.log(data);
  return (
    <div>
        {navigationBar}
        {data.map((element,idx) => {
        return (
        <div>
            <img src={element.imgUrl} width={300} height={300}/>
            <p>{element.name}</p>
            <p>{element.spec}</p>
            <p>{element.price}</p>
        </div>
        )
    })}</div>
  )
}
