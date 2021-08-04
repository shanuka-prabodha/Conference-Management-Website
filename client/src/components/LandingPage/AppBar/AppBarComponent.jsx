import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import AppBarButtons from "./AppBarButtons";
import NavDropdown from "react-bootstrap/NavDropdown"
import AppBarAvatar from "./AppBarAvatar";

const brandStyle = {
    color: "#5E4FA2",
    fontWeight: 700
}

const linkStyle = {
    color: "#5E4FA2",
    fontFamily: 'Montserrat',
    fontWeight: 500,
   
}

const navToggleStyle = {
    zIndex: "99"
}

function AppBarComponent(props) {

    console.log(props.getUserTyp);
    return (
        <Navbar className="shadow-sm p-3 bg-white rounded" bg="light" expand="lg" sticky="top">
            <Navbar.Brand href="/" style={brandStyle}>ICAF</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={navToggleStyle} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    
                    <Nav.Link href="/" style={linkStyle} className="mx-2">Home</Nav.Link>
                    <Nav.Link href="#keynotes" style={linkStyle} className="mx-2">Keynotes</Nav.Link>
                    <Nav.Link href="/workshop" style={linkStyle} className="mx-2">Workshops</Nav.Link>
                    <Nav.Link href="/papers" style={linkStyle} className="mx-2">Research Paper</Nav.Link>
                
                    {props.getUserType === "reviewer" && (
                        <Nav.Link href="/Rworkshop" style={linkStyle} className="mx-2">Workshops Review</Nav.Link>
                    )}
                    {props.getUserType === "reviewer" && (
                        <Nav.Link href="/RReasearch" style={linkStyle} className="mx-2" >Review ReaserachPapers</Nav.Link>
                    )}
                    {(props.getUserType === "researcher" || props.getUserType === "workshop") && (
                        <Nav.Link href="/messages" style={linkStyle} className="mx-2" >Messages</Nav.Link>
                    )}
                    {props.getUserType === "admin" && (
                        <Nav.Link href="/paidlist" style={linkStyle} className="mx-2" >Payments</Nav.Link>
                    )}
                    {props.getUserType === "researcher" && (
                        <Nav.Link href="/upload-file" style={linkStyle} className="mx-2" >Add Research Papers</Nav.Link>
                    )}
                    {props.getUserType === "researcher" && (
                        <Nav.Link href="/file-list" style={linkStyle} className="mx-2" >My Research Papers</Nav.Link>
                    )}
                    {props.getUserType === "attendee" && (
                        <Nav.Link href="/buyticket" style={linkStyle} className="mx-2" >Buy Ticket</Nav.Link>
                    )}

               

                    {props.getUserType === "editor" && (
                        <NavDropdown title="Added Main Events" style={linkStyle} id="navbarScrollingDropdown" className="mx-2">
                            <NavDropdown.Item href="/editorNoMainevents" style={linkStyle} >Editor Pending</NavDropdown.Item>
                            <NavDropdown.Item href="/editorApprovedMainevents" style={linkStyle} >Editor  Approved</NavDropdown.Item>
                            <NavDropdown.Item href="/editorDeclineMainevents" style={linkStyle} >Editor  Decline</NavDropdown.Item>

                        </NavDropdown>
                    )}

                    {props.getUserType === "editor" && (
                        <NavDropdown title="Approved Propertiece" style={linkStyle} id="navbarScrollingDropdown" className="mx-2">
                            <NavDropdown.Item href="/approvedworkshop" style={linkStyle} >Workshops</NavDropdown.Item>
                            <NavDropdown.Item href="/approvedresearchpaper" style={linkStyle} >Research Papers</NavDropdown.Item>
                        </NavDropdown>
                    )}

                    <NavDropdown title="Main Events" style={linkStyle} id="navbarScrollingDropdown" className="mx-2">
                        <NavDropdown.Item href="/workshopsEvents" style={linkStyle} >Workshops Main Events</NavDropdown.Item>
                        <NavDropdown.Item href="/ResearchEvents" style={linkStyle} >Reserch paper disscussion Main Events</NavDropdown.Item>

                    </NavDropdown>

                    {props.getUserType === "admin" && (
                        <NavDropdown title="Permission For Main Events" style={linkStyle} id="navbarScrollingDropdown" className="mx-2">
                            <NavDropdown.Item href="/adminApprovedevents" style={linkStyle} >Approved Main Events</NavDropdown.Item>
                            <NavDropdown.Item href="/noevents" style={linkStyle} >Pending Main Events</NavDropdown.Item>
                            <NavDropdown.Item href="/adminDeclineevents" style={linkStyle} >Decline Main Events</NavDropdown.Item>
                        </NavDropdown>
                    )}

                    {props.getUserType === "editor" && (
                        <Nav.Link href="/editconference" style={linkStyle} className="mx-2">Edit Conference</Nav.Link>
                    )}

                    {props.getUserType === "editor" && (
                        <Nav.Link href="/editconferencechange" style={linkStyle} className="mx-2">Changed Conference</Nav.Link>
                    )}

                    {props.getUserType === "admin" && (
                        <Nav.Link href="/participents" style={linkStyle} className="mx-2">Parcitipant List </Nav.Link>
                    )}

                    {props.getUserType === "admin" && (
                        <Nav.Link href="/adminConferenceApprovel" style={linkStyle} className="mx-2">Admin conference approvel</Nav.Link>
                    )}

                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <AppBarButtons />
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AppBarComponent;