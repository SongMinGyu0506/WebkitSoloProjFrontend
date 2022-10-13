import React, {useEffect, useState} from 'react'
import {Paper, List, Container, AppBar, Toolbar, Grid, Typography, Button, Input, FormControl, InputLabel, Select, MenuItem, TextField} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import SearchComs from './component/SearchComs';
import { call } from './service/ApiService';

function SearchCustom(props) {
    const location = useLocation();
    const [type, setType] = useState(location.state.type);
    const [keyword, setKeyword] = useState(location.state.keyword);
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    useEffect(()=> {
        call("/computer/search","POST",{type:type,name:keyword}).then((response)=>setData(response.data));
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
                <Button component={Link} to="/usermodify" color="inherit"> 개인정보 관리 </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )
    return (
        <div>
            {navigationBar}
            <Container maxWidth={"md"}>
                <h1 style={{marginBottom:"50px"}}>{keyword} 검색결과</h1>
                {/* <SearchComs type={type} keyword={keyword}/> */}
                {
                    data.map((element,idx)=> {
                        if(!element.price == "" || !element.price == "가격비교예정") {
                            return (
                                <Link to={`/search/inspect`} style={{textDecoration:'none'}} state={{comId:element.id}}>
                                    <Paper>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                {element.imgUrl == "https:" ? <img src="https://img.danawa.com/new/noData/img/noImg_130.gif" width={150} height={150}></img>:<img src={element.imgUrl} width={150} height={150}></img>}
                                                
                                            </Grid>
                                            <Grid item xs={9}>
                                                <h3>{element.name}</h3>
                                                <br></br>
                                                {element.price === "" ? <h4>가격 : 가격 미정</h4> : <h4>가격 : {element.price}</h4>}
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Link>
                            )
                        }
                    })
                }
            </Container>
        </div>
    )
}
export default SearchCustom;
