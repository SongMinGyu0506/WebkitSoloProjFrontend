import { Button,Grid,Link,TextField,Container,Typography } from '@material-ui/core';
import React, { Component } from 'react'
import {signup} from "./service/ApiService";

export class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 
    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        signup({email: email, name: username, password: password}).then(
            (response) => {
                window.location.href = "/login";
            }
        );
    } 
    render() {
        return (
            <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
                <Grid container spacing={2}>
                    <Typography component="h1" variant='h5'>
                        로그인
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
                                id="email"
                                label="이메일 주소"
                                name='email'
                                autoComplete='email'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id="username"
                                label="이름"
                                name='username'
                                autoComplete='username'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id="password"
                                label="패스워드"
                                type="password"
                                name="password"
                                autoComplete='password'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant='contained'
                                color='primary'
                            >
                                계정생성
                            </Button>
                        </Grid>
                        <Link href="/login" variant="body2">
                            <Grid item>계정이 있습니까? 로그인하세요</Grid>
                        </Link>
                    </Grid>
                </form>
            </Container>
        )
    }
}

export default Signup