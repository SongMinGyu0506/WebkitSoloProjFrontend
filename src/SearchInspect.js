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
      var compareSave = (e) => {
        call("/compare/save","POST",data[0]).then((response)=>{
          if(response.data) {
            alert("등록완료");
            window.location.href="/";
          }
        });
      }
  return (
    <div>
        {navigationBar}
        <Container maxWidth={"lg"}>
          {data.map((element,idx) => {
          return (
          <Paper style={{marginTop: "100px"}} elevation={12}>
            <Grid container>
              <Grid item xs={3} style={{padding:"25px"}}>
                {element.imgUrl === "https:" ? <img src="https://img.danawa.com/new/noData/img/noImg_130.gif" width={250} height={250}></img>:<img src={element.imgUrl} width={250} height={250}></img>}
              </Grid>
              <Grid item xs={9}>
                <h1 style={{padding:"25px"}}>{element.name}</h1>
                <hr style={{paddingLeft:"25px"}}/>
                <p style={{padding:"25px"}}><strong>{element.spec}</strong></p>
                <h2 style={{alignItems:"right",justifyContent:"right",textAlign:"right",paddingRight:"25px"}}>가격 : {element.price}원</h2>
                
              </Grid>
            </Grid>
            <hr/>
            <Grid container style={{marginTop:"10px",marginBottom:"10px",padding:"5px"}}>
              <Grid xs={5}>
                <Button color="primary" variant="contained" fullWidth style={{padding:"10px"}}>
                  <a href={element.originalUrl} style={{textDecoration:"none",color:"white"}}>
                    <h1>판매자 사이트 이동</h1>
                  </a>
                </Button>
              </Grid>
              <Grid xs={2}></Grid>
              <Grid xs={5}>
                <Button color="primary" variant='outlined' fullWidth style={{padding:"10px"}} onClick={compareSave}><h1>비교상품 등록</h1></Button>
              </Grid>
            </Grid>
          </Paper>
          )
        
    })}</Container></div>
  )
}
