import React from 'react'
import './Login.css'
import { Layout } from 'antd';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import axios from 'axios';
import sign from 'jwt-encode';

const { Header, Content } = Layout;

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gotocreate, setGotocreate] = useState(false);
    const [show, setShow] = useState(false);
    const [messeage, setMesseage] = useState("");
    const [gotohome, setGotohome] = useState(false);
    const navigate = useNavigate();
    if (gotocreate) {
        return <Navigate to="/Createuser" />;
    }
    if (gotohome) {
        return <Navigate to="/Home" />;
    }
    function login(e) {
        e.preventDefault();
        const encodedPassword = sign({ 'pwd': password }, process.env.REACT_APP_SECRET_SALT);
        axios({
            method: 'post',
            url: 'http://10.128.66.39:8000/api/auth/login',
            data: {
                username: username,
                password: encodedPassword
            }
        })
        .then(res => {
            if (res.status === 200) {
                sessionStorage.setItem('jwt', res.data.jwt);
                if (res.data.role === "DBA") {
                    setGotocreate(true);
                }
                else if (res.data.role === "USER") {
                    setGotohome(true);
                }
            }
        })
        .catch((e) => {
            if (e.response.status === 401) {
                alert(e.response.data);
            }
        });
       
    }

    return (
        <Layout style={{ height: "100vh" }}>

            <Layout>
                <Header style={{ backgroundColor: "transparent", textAlign: "center", color: "black", fontWeight: "bold" }}>
                    <div className="container bg-transparent">
                        <div className="position-fixed top-0 start-0">
                            <img src="https://i.ibb.co/55dcLG1/logo.png" alt="logo" border="0" width="60px" height="56px" />
                        </div>
                        <div className="row">
                            <div class="col-12 display-5 ">Entertainment show</div>
                        </div>
                    </div>
                </Header>
                <Content>;


                    <div class="container middle">
                        <form onSubmit={login} class="align-items-center p-3 mt-3">
                            <div class="form-group text-center fs-6">
                                <span class="far fa-user" ></span>
                                <input type="text" class="form-control sizeofbox"
                                    value={username} name="username" id="username" placeholder="Username"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    required />

                            </div>

                            <div class="form-group text-center fs-6 mt-3 ">
                                <label for="inputPassword2" class="visually-hidden">Password</label>
                                <span class="fas fa-key"></span>
                                <input type="password" class="form-control sizeofbox" name="password" id="pwd"
                                    value={password} placeholder="Password" onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required />

                            </div>
                            <div class=" text-center fs-6 mt-3">
                                <button type="submit">Login </button>
                            </div>
                            
                        </form>
                        <div class="text-center fs-6">
                            <a href="#">Forget password?</a>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Login