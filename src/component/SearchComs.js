import React, { Component } from 'react'
import {Paper, Grid, Button, Select, MenuItem, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

class SearchComs extends Component {
  render() {
    return (
      <div>
        <Paper style={{margin:16, padding: 16}}>
          <Grid container>
          <Grid xs={1} md={1} item>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="VGA"
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value="VGA" selected={true}>VGA</MenuItem>
                <MenuItem value="CPU">CPU</MenuItem>
                <MenuItem value="SSD">SSD</MenuItem>
              </Select>
            </Grid>
            <Grid xs={9} md={9} item style={{paddingRight:16}}>
              <TextField placeholder="Search Computer" fullWidth/>
            </Grid>
            <Grid xs={2} md={2} item>
              <Button fullWidth color="primary" variant="contained" endIcon={<SearchIcon/>}>SEARCH</Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}
export default SearchComs;


