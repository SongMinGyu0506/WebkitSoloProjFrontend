import React, { Component } from 'react'
import {Paper, List, Container, AppBar, Toolbar, Grid, Typography, Button, Input, FormControl, InputLabel, Select, MenuItem, TextField, TableContainer, Table, TableBody, TableCell, TableRow, Card, TableHead} from "@material-ui/core";
import { call } from './service/ApiService';
class CompareCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserAddData: false,
      isRecommendData: false,
      userAddData : {},
      recommendData : [],
      recommendInspect:{},
    }
    this.testClick = this.testClick.bind(this);
    this.recommendClick = this.recommendClick.bind(this);
    this.myRef = React.createRef();
  }
  testClick(e) {
    this.setState({recommendInspect:{}});
    this.setState({isRecommendData:false});
    call("/computer/inspect?comId="+e.target.parentElement.id,"GET",null).then((response)=> {
      this.setState({isUserAddData:true});
      this.setState({userAddData:response.data[0]});
    }).then(()=>{
      call("/compare/recommand-read","POST",this.state.userAddData).then((res)=>{
        this.setState({recommendData:res.data});
      });
    })
  }
  recommendClick(e) {
    this.setState({isRecommendData:true});
    call("/computer/inspect?comId="+e.target.parentElement.id,"GET",null).then((response)=>
      this.setState({recommendInspect:response.data[0]}));
  }
  componentDidMount() {
  }
  render() {
    return (
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h3>등록 부품</h3>
            <TableContainer>
              <Table>
              <TableHead>
                  <TableRow>
                    <TableCell>이미지</TableCell>
                    <TableCell>상품명</TableCell>
                    <TableCell>가격</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.userComData && this.props.userComData.map((element,idx)=> {
                    return (
                      <TableRow onClick={this.testClick} id={element.id}>
                        <TableCell>{element.imgUrl == "https:" ? <img src="https://img.danawa.com/new/noData/img/noImg_130.gif" width={45} height={45}></img>:<img src={element.imgUrl} width={45} height={45}></img>}</TableCell>
                        <TableCell>{element.name}</TableCell>
                        <TableCell>{element.price}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <h3>등록 부품상세</h3>
              {this.state.isUserAddData === true ?
                <Card>
                <Grid container>
                  <Grid item xs={4} style={{padding:"15px"}}>
                    {this.state.userAddData.imgUrl == "https:" ? <img src="https://img.danawa.com/new/noData/img/noImg_130.gif"></img>:<img src={this.state.userAddData.imgUrl}></img>}
                  </Grid>
                  <Grid item xs={8}>
                    <h2>{this.state.userAddData.name}</h2>
                    <h4>{this.state.userAddData.price} 원</h4>
                  </Grid>
                </Grid>
                <hr/>
                <Grid container style={{padding:"15px"}}>
                  <strong>부품 스펙</strong>
                  <p>{this.state.userAddData.spec}</p>
                </Grid>  
              </Card>
              :
              <p></p>
              }
            </Grid>
            <Grid container>
            <h3>추천 부품상세</h3>
            {this.state.isRecommendData === true ?
                <Card>
                <Grid container>
                  <Grid item xs={4} style={{padding:"15px"}}>
                    {this.state.recommendInspect.imgUrl == "https:" ? <img src="https://img.danawa.com/new/noData/img/noImg_130.gif"></img>:<img src={this.state.recommendInspect.imgUrl}></img>}
                  </Grid>
                  <Grid item xs={8}>
                    <h2>{this.state.recommendInspect.name}</h2>
                    <h4>{this.state.recommendInspect.price} 원</h4>
                  </Grid>
                </Grid>
                <hr/>
                <Grid container style={{padding:"15px"}}>
                  <strong>부품 스펙</strong>
                  <p>{this.state.recommendInspect.spec}</p>
                </Grid>  
              </Card>
              :
              <p></p>
              }
            </Grid>
          </Grid>
          <Grid item xs={4}>
          <h3>추천 부품</h3>
          <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>이미지</TableCell>
                    <TableCell>상품명</TableCell>
                    <TableCell>가격</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.recommendData && this.state.recommendData.map((element,idx)=> {
                    return (
                      <TableRow onClick={this.recommendClick} id={element.id}>
                        <TableCell>{element.imgUrl == "https:" ? <img src="https://img.danawa.com/new/noData/img/noImg_130.gif" width={45} height={45}/> : <img src={element.imgUrl} width={45} height={45}/>}</TableCell>
                        <TableCell>{element.name}</TableCell>
                        <TableCell>{element.price[0]}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default CompareCom;
