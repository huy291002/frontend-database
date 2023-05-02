import { Layout } from 'antd';
import React, { useEffect } from 'react';
import './Home.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Select from "react-select";
import axios from 'axios';
import { Typography } from "antd";
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import ScoreIcon from '@mui/icons-material/Score';
import ReorderIcon from '@mui/icons-material/Reorder';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const { Header, Content } = Layout;

function Home() {
    const [word1, setWord1] = useState("");
    const [words1, setWords1] = useState([]);
    const [traineeName, setTraineeName] = useState('');
    const [words, setWords] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [view, setView] = useState(false);
    const cancelView = () => setView(false);
    const handleView = (e) => {
        console.log(e.target.dataset.value);
        setView(true);
    }

    const [result, setResult] = useState(false);
    const cancelResult = () => setResult(false);
    const handleResult = () => setResult(true);

    const [searchview, setSearchview] = useState(false);
    const cancelSearchview = () => setSearchview(false);
    const handleSearchview = () => setSearchview(true);

    const [ssn, setSsn] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('')
    const [dateofbirth, setDateofbirth] = useState('');
    const [photo, setPhoto] = useState('');
    const [companyid, setCompanyid] = useState('');
    const [trainees, setTrainees] = useState([]);

    const [viewSSN, setViewSSN] = useState('');
    const [viewFullname, setViewFullname] = useState('');
    const [viewPhone, setViewPhone] = useState('');
    const [viewAddress, setViewAddress] = useState('');
    const [viewPhoto, setViewPhoto] = useState('');
    const [viewAchievement, setViewAchievement] = useState('');
    const [viewParticipate, setViewParticipate] = useState('');

    const [ssnResult, setSsnResult] = useState('');
    const [year, setYear] = useState('');
    const [results, setResults] = useState([]);
    function search(e) {
        e.preventDefault();
        console.log("Name: ", traineeName);
        setWords((prev) => [...prev, traineeName]);
    }


    function handleSubmit(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://10.128.66.39:8000/api/add_trainee',
            data: {
                ssn: ssn,
                fName: fName,
                lName: lName,
                addr: address,
                phone: phone,
                dob: dateofbirth,
                photo: photo,
                companyID: companyid,
                by: sessionStorage.getItem('jwt')
            }
        }).then(res => {
            console.log(res);
            setShow(false);
        })
            .catch(e => console.log(e));
    }

    function handleSearch(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://10.128.66.39:8000/api/view_trainee',
            data: {
                name: traineeName,
                by: sessionStorage.getItem('jwt')
            }
        }).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                setTrainees(res.data);
            }
        })
            .catch(e => console.log(e));
    }

    function handleRowClick(e) {
        console.log(e);
        console.log(e.target.outerText);
        if (e.target.outerText === "Close") {
            setView(false);
        }
        else {
            trainees.forEach(trainee => {
                if (trainee["ssn"] === e.target.outerText) {
                    setViewSSN(trainee["ssn"]);
                    setViewFullname(trainee["fullname"]);
                    setViewAddress(trainee["address"]);
                    setViewPhone(trainee["phone"]);
                    setViewPhoto(trainee["photo"]);
                    axios({
                        method: 'post',
                        url: 'http://10.128.66.39:8000/api/get_detail',
                        data: {
                            ssn: trainee["ssn"]
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            console.log(res);
                            setViewAchievement(res.data["best_achieve"]);
                            setViewParticipate(res.data["participated_season"]);
                        }
                    })
                        .catch(e => console.log(e));
                }
            })
            setView(true);
        }
    }

    function handleRetrieve(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://10.128.66.39:8000/api/retrieve_result',
            data: {
                ssn: ssnResult,
                year: year
            }
        }).then(res => {
            if (res.status === 200) {
                console.log(res);
                setResults(res.data);
            }
        })
            .catch(e => console.log(e));
    }
    return (


        <div class="bg2">



            <div className="container bg-transparent">
                <div className="position-fixed top-0 start-0">
                    <img src="https://i.ibb.co/55dcLG1/logo.png" alt="logo" border="0" width="60px" height="56px" />
                </div>
                <div class="text-center">
                        <Typography.Title level={1} style={{ color: "white" }}> Entertainment show</Typography.Title>
                </div>
            </div>


            <div className="container text center">
                <Button className="col-1 " variant="primary" onClick={handleShow}>
                    <AddBoxTwoToneIcon></AddBoxTwoToneIcon>Add
                </Button>
                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered
                    show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Information's trainee needed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form class="row g-3">
                            <div class="col-12"  >
                                <label for="inputname1" class="form-label" style ={{fontWeight: "bold"}}>
                                    <PermIdentityTwoToneIcon></PermIdentityTwoToneIcon> SSN
                                </label>
                                <br></br>
                                <input value={ssn} type="text" class="sizeofbox" rows="4" onChange={(e) => setSsn(e.target.value)}></input>
                            </div>
                            <br></br>
                            <div class="input group">
                                <div class="input-group-prepend" style ={{fontWeight: "bold"}}>
                                    <DriveFileRenameOutlineTwoToneIcon></DriveFileRenameOutlineTwoToneIcon>First and last name
                                </div>
                                <input value={fName} type="text" aria-label="First name" class="form-control" onChange={(e) => { setFName(e.target.value) }} />
                                <input value={lName} type="text" aria-label="Last name" class="form-control" onChange={(e) => { setLName(e.target.value) }} />

                            </div>
                            <div class="col-12">
                                <label for="inputname1" class="form-label" style ={{fontWeight: "bold"}}>
                                    <HomeIcon></HomeIcon> Address
                                </label>
                                <br></br>
                                <input value={address} type="text" class="sizeofbox" onChange={(e) => { setAddress(e.target.value) }} ></input>
                            </div>
                            <div class="col-6">

                                <label for="inputname1" class="form-label" style ={{fontWeight: "bold"}}>
                                    <DateRangeIcon></DateRangeIcon>Date of birth
                                </label>
                                <br></br>
                                <input value={dateofbirth} type="text" class="sizeofbox" onChange={(e) => { setDateofbirth(e.target.value) }} ></input>
                            </div>

                            <div class="col-6">
                                <label for="inputname1" class="form-label" style ={{fontWeight: "bold"}}>
                                    <PhotoCameraIcon></PhotoCameraIcon> Photo of trainee
                                </label>
                                <br></br>
                                <input value={photo} type="text" class="sizeofbox" onChange={(e) => { setPhoto(e.target.value) }}></input>
                            </div>
                            <div class="col-6">
                                <label for="inputname1" class="form-label" style ={{fontWeight: "bold"}}>
                                    <SmartphoneIcon></SmartphoneIcon>Phone
                                </label><br></br>
                                <input value={phone} type="text" class="sizeofbox" onChange={(e) => { setPhone(e.target.value) }} ></input>
                            </div>
                            <div class="col-6">
                                <label for="inputname1" class="form-label" style ={{fontWeight: "bold"}}>
                                    <BusinessIcon></BusinessIcon> Company ID
                                </label><br></br>
                                <input value={companyid} type="text" class="sizeofbox" onChange={(e) => { setCompanyid(e.target.value) }} ></input>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className="container text-center">
                <div className="container text-center">
                    <div className="row mt-2">
                        <div className="col-4 border-right" >
                            <div className="mb-3">
                                <form onSubmit={search}>
                                    <label for="exampleFormControlTextarea1" class="form-label">
                                        <DriveFileRenameOutlineTwoToneIcon></DriveFileRenameOutlineTwoToneIcon>Enter trainee's name
                                    </label>
                                    <input className="form-control" value={traineeName} id="exampleFormControlTextarea1" onChange={(e) => {
                                        setTraineeName(e.target.value);
                                    }}
                                        rows="3"></input>
                                    <br></br>
                                    <button type="submit" onClick={handleSearch} class="btn btn-primary mb-3" >
                                        <SearchIcon></SearchIcon>Search
                                    </button>

                                </form>
                            </div>
                        </div>

                        <div className="col-8">

                            <div class="table table-bordered">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="col-6 table-align-middle" style={{ width: "50%", color: "white" }} >
                                                <ModeEditIcon></ModeEditIcon>Trainee's full name
                                            </th>
                                            <th class="col-2 table-align-middle" style={{ width: "30%", color: "white" }} >
                                                <PermIdentityTwoToneIcon></PermIdentityTwoToneIcon>SSN 
                                            </th>
                                            <th class="col-4 table-align-middle" style={{ width: "20%" }} > </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            trainees.map((object) => {
                                                return (
                                                    <tr onClick={handleRowClick}>
                                                        <td class="col-6 border-right-table " style={{ width: "50%" }}>{object["fullname"]}</td>
                                                        <td class="col-2  " style={{ width: "30%" }}>{object["ssn"]}</td>
                                                        <td class="col-4 " style={{ width: "20%" }}>
                                                            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered
                                                                show={view} onHide={cancelView}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Information's trainee </Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <form class="row g-3">
                                                                        <div class="col-12">
                                                                            <p><strong>SSN: </strong>{viewSSN}</p>
                                                                        </div>
                                                                        <div class="col-12">
                                                                            <p><strong>Full name: </strong>{viewFullname}</p>
                                                                        </div>
                                                                        <div class="col-12">
                                                                            <p><strong>Address: </strong>{viewAddress}</p>
                                                                        </div>
                                                                        <div class="col-12">
                                                                            <p><strong>Number of seasons participating: </strong>{viewParticipate}</p>
                                                                        </div>
                                                                        <div class="col-12">
                                                                            <p>  <strong>Best achievement (last episode): </strong>{viewAchievement}</p>
                                                                        </div>
                                                                        <div class="col-12">
                                                                            <p><strong>Photo: </strong>{viewPhoto}</p>
                                                                        </div>
                                                                        <div class="col-12">
                                                                            <p><strong>Phone: </strong>{viewPhone}</p>
                                                                        </div>
                                                                        <br></br>
                                                                    </form>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="primary" onClick={cancelView}>
                                                                        Close
                                                                    </Button>

                                                                </Modal.Footer>
                                                            </Modal>

                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container text-center">
                <div className="container text-center">
                    <div className="row mt-2">
                        <div className="col-4 border-right" >
                            <div className="mb-3">
                                <form onSubmit={search}>
                                    <label for="exampleFormControlTextarea2" class="form-label">Trainee's SSN</label>
                                    <input className="form-control" value={ssnResult} id="exampleFormControlTextarea2" onChange={(e) => {
                                        setSsnResult(e.target.value);
                                    }}
                                        rows="3"></input>
                                    <br></br>
                                    <label for="exampleFormControlTextarea2" class="form-label">
                                        <ViewTimelineIcon></ViewTimelineIcon>Year
                                    </label>
                                    <input className="form-control" value={year} id="exampleFormControlTextarea2" onChange={(e) => {
                                        setYear(e.target.value);
                                    }}
                                        rows="3"></input>
                                    <br></br>
                                    <button type="submit" onClick={handleRetrieve} class="btn btn-primary mb-3" >
                                        <SavedSearchIcon></SavedSearchIcon>Retrieve result
                                    </button>

                                </form>
                            </div>
                        </div>

                        <div className="col-8">
                            <div class="table table-bordered">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="col-6 table-align-middle" style={{ width: "50%", color: "white" }} >
                                                <ReorderIcon></ReorderIcon>Episode's number
                                            </th>
                                            <th class="col-2 table-align-middle" style={{ width: "30%", color: "white" }} >
                                                <ScoreIcon></ScoreIcon>Result
                                            </th>
                                            <th class="col-4 table-align-middle" style={{ width: "20%" }} > </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            results.map((object) => {
                                                return (
                                                    <tr onClick={handleRowClick}>
                                                        <td class="col-6 border-right-table " style={{ width: "50%" }}>{object["EP_NO"]}</td>
                                                        <td class="col-2  " style={{ width: "30%" }}>{object["RESULT"] ? object["RESULT"] : 'ELIMINATED'}</td>
                                                        <td class="col-4 " style={{ width: "20%" }}>
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>







    )
}
export default Home;