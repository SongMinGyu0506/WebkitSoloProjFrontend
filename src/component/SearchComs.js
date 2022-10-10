import React, { Component } from 'react'
import {Paper, Grid, Button, Select, MenuItem, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

class SearchComs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
      keyword: this.props.keyword
    }
    this.onSelectChangeCustom = this.onSelectChangeCustom.bind(this);
    this.onTextFieldChange = this.onTextFieldChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onSelectChangeCustom(event) {
    this.setState({type:event.target.value});
    console.log(this.state.type);
  }
  onTextFieldChange(event) {
    this.setState({keyword:event.target.value});
    console.log(this.state.keyword);
  }
  onButtonClick(event) {
    window.location.href = "/search"
  }
  render() {
    console.log(this.state.keyword);
    return (
      <div>
        <Paper style={{margin:16, padding: 16}}>
          <Grid container>
          <Grid xs={1} md={1} item>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.type}
                label="Type"
                onChange={this.onSelectChangeCustom}
              >
                <MenuItem value="VGA">VGA</MenuItem>
                <MenuItem value="CPU">CPU</MenuItem>
                <MenuItem value="SSD">SSD</MenuItem>
              </Select>
            </Grid>
            <Grid xs={9} md={9} item style={{paddingRight:16}}>
              <TextField placeholder="Search Computer" fullWidth onChange={this.onTextFieldChange} value={this.state.keyword}/>
            </Grid>
            <Grid xs={2} md={2} item>
              <Link to={`/search`} state={{type:this.state.type, keyword:this.state.keyword}}>
                <Button fullWidth color="primary" variant="contained" endIcon={<SearchIcon/>}>SEARCH</Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}
export default SearchComs;


