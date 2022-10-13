import React, { Component } from 'react'
import { call,signout,userModify } from './service/ApiService';
import {Box,Tabs,Tab,Paper, List, Container, AppBar, Toolbar, Grid, Typography, Button, Input, FormControl, InputLabel, Select, MenuItem, TextField} from "@material-ui/core";
import { Link } from 'react-router-dom';
import CompareCom from './CompareCom';
class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            changeUser: {},
            changePassword: {},
            value:0,
            userName:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    a11yProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
      handleChange = (event, newValue) => {
        this.setState({ value: newValue });
      }
    handleSubmit(event) {
        event.preventDefault();
        userModify(this.state.users).then((response)=> {
            console.log(response);
            window.location.href="/";
        })
    }

    onInputChangeUsername = (e) => {
        let thisItem = this.state.users.name;
        thisItem = e.target.value;
        this.setState({users:{
            token: this.state.users.token,
            email: this.state.users.email,
            name: thisItem,
            password: this.state.users.password,
            id: this.state.users.id,
            isAdmin : this.state.users.isAdmin,
            isSecession: this.state.users.isSecession,
            userDate : this.state.users.userDate,
            computers: this.state.users.computers
        }});
    }
    onInpuptChangePassword = (e) => {
        let thisItem = this.state.users.name;
        thisItem = e.target.value;
        this.setState({users:{
            token: this.state.users.token,
            email: this.state.users.email,
            name: this.state.users.name,
            password: thisItem,
            id: this.state.users.id,
            isAdmin : this.state.users.isAdmin,
            isSecession: this.state.users.isSecession,
            userDate : this.state.users.userDate,
            computers: this.state.users.computers
        }});
    }
    componentDidMount() {
        call("/auth/modify","GET",null)
            .then((response)=> {
                response.token = localStorage.getItem("ACCESS_TOKEN");
                this.setState({users:response});
                console.log(this.state.users);
                this.state.userName = this.state.users.name;
            });
        
    }
    render() {
        var navigationBar = (
            <AppBar position="static">
              <Toolbar>
                <Grid justify="space-between" container>
                  <Grid item>
                    <Link to="/" style={{textDecoration:"none",color:"white"}}>
                        <Typography variant="h6">Compu's Combine</Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    반갑습니다. {this.state.userName} 님 &nbsp;
                    <Button color='inherit' onClick={signout}>logout</Button>
                    <Button component={Link} to="/usermodify" color="inherit"> 개인정보 관리 </Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          )
          var userModifyInput = (
            <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
                    <Grid container spacing={2}>
                        <Typography component="h1" variant='h5'>
                            회원정보 수정
                        </Typography>
                    </Grid>
                    <form noValidate onSubmit={this.handleSubmit}>
                        {" "}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    required
                                    fullWidth
                                    id="name"
                                    label="유저 이름"
                                    name='name'
                                    autoComplete='text'
                                    value={this.state.users.name}
                                    onChange={this.onInputChangeUsername}
                                    InputLabelProps={{shrink:true}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    required
                                    fullWidth
                                    type={"password"}
                                    id="password"
                                    label="패스워드"
                                    name="password"
                                    autoComplete='password'
                                    onChange={this.onInpuptChangePassword}
                                    InputLabelProps={{shrink:true}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                >
                                    회원정보 수정
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
          )
        return (
            <div>
                {navigationBar}
                <AppBar position="static" style={{marginTop:"0.3px"}}>
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                        <Tab label="회원정보 수정" {...this.a11yProps(0)} />
                        <Tab label="부품 비교" {...this.a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    {userModifyInput}
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <CompareCom userComData={this.state.users.computers}/>
                </TabPanel>
        </div>
        )
    }
}

class TabPanel extends Component {
    render() {
      return (
        <Typography component="div" hidden={this.props.value !== this.props.index}>
          <Box p={3}>{this.props.children}</Box>
        </Typography>
      );
    }
  }

export default UserInfo;
