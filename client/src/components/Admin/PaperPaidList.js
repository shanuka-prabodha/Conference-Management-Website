import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css';
import Footer from "../LandingPage/Footer/Footer";
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

AOS.init();
export default function PaperPaidList() {
    const [userType, seTuserType] = useState('')
    const [PaperPaids, setPaperPaids] = useState([]);

    useEffect(() => {
        const getusertype = async () => {
            const access_token = localStorage.getItem('token')
            console.log(access_token)
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
            axios.get('http://localhost:8070/user/post', config).then((response) => {
                if (response.data.message) {
                    alert(response.data.message)
                } else {
                    seTuserType(response.data.user.usertype)

                }
            })
                .catch()
        };
        getusertype();


        function getList() {
            axios.get("http://localhost:8070/payment/allpayments").then((res) => {
                //console.log(res)
                setPaperPaids(res.data.data)
            }).catch((err) => {
                alert(err.message)
            })
        }

        getList();

    })


    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: '#5E4FA2',
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);

    let count = 0;

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });


    const classes = useStyles();


    return (

        <div>
            <AppBarComponent getUserType={userType} />
            <div className="container my-5">
                <div className="dialog-title" style={{ marginBottom: "10%" }}>
                    List Research Paper paids
                    <hr className="workshopStyle" />
                </div>
                <div >

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell>User Name</StyledTableCell>
                                    <StyledTableCell >Email</StyledTableCell>
                                    <StyledTableCell >Paid Type</StyledTableCell>
                                    <StyledTableCell >Amount</StyledTableCell>
                                    <StyledTableCell >Date Purchase</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    PaperPaids.map(PaperPaids => (
                                        <TableRow key={PaperPaids._id}>
                                            <TableCell >{count = count + 1}</TableCell>
                                            <TableCell >{PaperPaids.users.username}</TableCell>
                                            <TableCell >{PaperPaids.users.email}</TableCell>
                                            <TableCell >{PaperPaids.type}</TableCell>
                                            <TableCell >Rs.{PaperPaids.amount}/=</TableCell>
                                            <TableCell >{PaperPaids.PaidDate}</TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

        </div>
    )
}