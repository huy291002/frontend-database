import React from 'react'
import './Login.css'
import { Layout } from 'antd';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import sign from 'jwt-encode';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SecurityIcon from '@mui/icons-material/Security';
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

        <>
            <div class="bg">
                <div className='contain'>
                    <div className='widthinput'>
                        <div class="container middle">
                            <form onSubmit={login} class="align-items-center p-3 mt-3">
                                <div class="text-center" style ={{fontSize: "30px"}}>
                                     LOGIN
                                </div>
                                <br></br>
                                <div class="form-group fs-6">
                                    <DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon>
                                    <label for="validationTooltipUsername" class="form-label">Username</label>
                                    <br></br>
                                    <input type="text" class="form-control"
                                        value={username} name="username" id="username"
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        required />

                                </div>

                                <div class="form-group  fs-6 mt-3 ">
                                    <SecurityIcon></SecurityIcon>
                                    <label for="validationTooltipUsername" class="form-label">Password</label>
                                    <br></br>
                                    <span class="fas fa-key"></span>
                                    <input type="password" class="form-control" name="password" id="pwd"
                                        value={password} onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        required />

                                </div>
                                <div class=" text-center fs-6 mt-3">
                                    <button class ="btn btn-primary" type="submit">Login </button>
                                </div>

                            </form>
                            <div class="text-center fs-6">
                                <a href="#">Forget password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Login