import {Paper, List, Container, AppBar, Toolbar, Grid, Typography, Button, Input, FormControl, InputLabel, Select, MenuItem, TextField} from "@material-ui/core";
import {spacing} from "@material-ui/system";
import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import { call,signout } from './service/ApiService';
import SearchComs from "./component/SearchComs";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading:true,
      users: {},
      checkedItems: []
    };
  }
  componentDidMount() {
    call("/computer","GET",null).then((response)=>this.setState({items:response.data,loading:false}));
    call("/auth/modify","GET",null)
            .then((response)=> {
                response.token = localStorage.getItem("ACCESS_TOKEN");
                console.log(response);
                this.setState({users:response});
            });
  }
  render() {
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">Compu's Combine</Typography>
            </Grid>
            <Grid item>
              반갑습니다. {this.state.users.name} 님 &nbsp;
              <Button color='inherit' onClick={signout}>logout</Button>
              <Button component={Link} to="/usermodify" color="inherit"> 정보 수정 </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
    var test = this.state.items.length > 0 && (
      <List>
        {this.state.items.map((item,idx)=> {
          return (
          <div>
            <p>{item.name}</p>
            <img src={item.imgUrl}/><br/>
            <a href={item.originalUrl}>{item.originalUrl}</a>
            <p>{item.price}</p>
          </div>
          )
        })}
      </List>
    )
    var title = (
    <Grid container style={{alignItems:"center",justifyContent:"center"}}>
      <Grid item>
        <h1 style={{margin:16,alignItems:"center"}}>Compu's Combine!</h1>
      </Grid>
    </Grid>
      )
    // var searchDiv = (
    //   <Paper style={{margin:16, padding: 16}}>
    //     <Grid container>
    //     <Grid xs={1} md={1} item>
    //         <Select
    //           labelId="demo-simple-select-label"
    //           id="demo-simple-select"
    //           value="VGA"
    //           label="Age"
    //           // onChange={handleChange}
    //         >
    //           <MenuItem value="VGA" selected={true}>VGA</MenuItem>
    //           <MenuItem value="CPU">CPU</MenuItem>
    //           <MenuItem value="SSD">SSD</MenuItem>
    //         </Select>
    //       </Grid>
    //       <Grid xs={9} md={9} item style={{paddingRight:16}}>
    //         <TextField placeholder="Search Computer" fullWidth/>
    //       </Grid>
    //       <Grid xs={2} md={2} item>
    //         <Button fullWidth color="secondary" variant="outlined" onClick={this.onButtonClick}>검색</Button>
    //       </Grid>
    //     </Grid>
    //   </Paper>
    // );
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md" style={{marginTop:"250px"}}>
          {title}
        {/* {searchDiv}   */}
          <SearchComs/>
        </Container>
        
      </div>
    )
    var loadingPage = <h1>LoADING...</h1>
    var content = loadingPage;
    if (!this.state.loading) {

      content = todoListPage;
    }
    return (
      <div>
        <p>
          {content}
        </p>
      </div>
    )
  }
}

export default App;
