import React from 'react'
import { Layout } from 'antd';
import ReactDOM from 'react-dom';
import { Component, useEffect } from 'react';
import { useState, useRef } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import 'react-dropdown/style.css';
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import "./Createuser.css";
import { Form, Checkbox, Button } from "react-bootstrap";
import 'rsuite/dist/rsuite.min.css';
import axios from 'axios';
import sign from 'jwt-encode';
const { Header, Content } = Layout;


function Createuser() {

  const [items, setItems] = useState([
    { id: "em", label: "Exact Mass", checked: true },
    { id: "f", label: "Formula", checked: true }
  ]);
  const [username, setUsername] = useState("");
  const [passwords, setPasswords] = useState("");
  const [listTables, setListTables] = useState([]);
  const [listTableKeys, setListTableKeys] = useState({});
  const [selectedOptionsRole, setSelectedOptionsRole] = useState();
  const [selectedOptionsTable, setSelectedOptionsTable] = useState();
  const optionList = [
    { value: "SELECT", label: "SELECT" },
    { value: "INSERT", label: "INSERT" },
    { value: "UPDATE", label: "UPDATE" },
    { value: "DELETE", label: "DELETE" }
  ];
  const navigate = useNavigate();

  function createuser(e) {
    e.preventDefault();
    const pwd = sign({'pwd': passwords}, process.env.REACT_APP_SECRET_SALT);
    const roles = selectedOptionsRole.map(obj => {
      return obj.value;
    })
    const tables = selectedOptionsTable.map(obj => {
      return obj.value;
    })
        axios({
            method: 'post',
            url: 'http://10.128.66.39:8000/api/auth/register',
            data: {
                by: sessionStorage.getItem('jwt'),
                usn: username,
                pwd: pwd,
                role: roles,
                table: tables
            }
        })
        .then(res => {
          console.log(res);
          if (res.status === 201) {
            alert(res.data.response);
            navigate('/')
          }
        })
  }
 
  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://10.128.66.39:8000/api/table/list_tables',
      data: {
        by: sessionStorage.getItem('jwt'),
      }
    })
      .then(res => {
        console.log(res.data);
        const list_tables_key = Object.keys(res.data).map(key => {
          return { value: key, label: key }
        })
        setListTableKeys(list_tables_key);
        setListTables(res.data);

      })
      .catch(e => {
        console.log(e);
      })
  }, [])


  function handleSelectRole(data) {
    setSelectedOptionsRole(data);
  }

  function handleSelectTable(data) {
    const lastInsert = data.at(-1)["value"];
    const tempArr = [];
    tempArr.push({value: lastInsert, label: lastInsert})
    if (listTables[lastInsert]["ref_tables"].length > 0) {
      listTables[lastInsert]["ref_tables"].forEach(element => {
        if (selectedOptionsTable === undefined) {
          tempArr.push({value: element, label: element});
        }
        else {
          const option = selectedOptionsTable.find(e => {
            if (e.value === element) {
              return true;
            }
            return false;
          })
          if (option === undefined) {
            tempArr.push({value: element, label: element});
          }
        }
      });
      if (selectedOptionsTable === undefined) {
        setSelectedOptionsTable(tempArr);
      }
      else {
        setSelectedOptionsTable(selectedOptionsTable.concat(tempArr));
      }
    }
    else {
      setSelectedOptionsTable(data);
    }
    console.log('selectedOptionsTable', selectedOptionsTable);
    console.log('selectedOptionsRole', selectedOptionsRole);
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
        <Content>


          <div className="padd" class="container middle  pt-5 ">
            <div class="container middle">
              <div style={{ textAlign: "center", color: "black", fontSize: 25 }}>Create user</div>
            </div>
            <form onSubmit={createuser} class="align-items-center p-3 mt-3" >
              <div class="text-center fs-6 ">
                <span class="far fa-user" ></span>
                <input type="text" class="sizeofbox" name="username" id="username" placeholder="Username" onChange={(e) => { setUsername(e.target.value); }} required />



              </div>

              <div class="text-center fs-6 mt-3 ">
                <label for="inputPassword2" class="visually-hidden">Password</label>
                <span class="fas fa-key"></span>
                <input type="password" class="sizeofbox" name="password" id="pwd" placeholder="Password" onChange={(e) => { setPasswords(e.target.value); }} required />

              </div>
              <br></br>
              <div className="App container " class="text-center  container middle " style={{ width: '350px' }}>
                <Select
                  options={optionList}
                  placeholder="Select role"
                  value={selectedOptionsRole}
                  onChange={handleSelectRole}
                  isSearchable={true}
                  isMulti
                />
                <br></br>
                <Select
                  options={listTableKeys}
                  placeholder="Select table"
                  value={selectedOptionsTable}
                  onChange={handleSelectTable}
                  isSearchable={true}
                  isMulti
                />


                <br></br>

              </div>

              <div class=" text-center fs-6 mt-3">
                <button class="btn btn-primary " type="submit">Create</button>
              </div>
            </form>





          </div>


        </Content>
      </Layout>
    </Layout>
  )
}

export default Createuser