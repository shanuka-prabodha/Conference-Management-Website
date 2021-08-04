import React, { useEffect, useState } from "react";
import AddCard from './WorkshopAddCard';
import ItemCard from './WorkshopItemCard'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../Styles/card.css";
import ItemForm from './ItemForm';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import LoadingAnimation from "./LoadingAnimation";
import zIndex from "@material-ui/core/styles/zIndex";

import AOS from 'aos';
import '../../../../node_modules/aos/dist/aos.css'; // You can also use <link> for styles


AOS.init();
//var userType = "workshop";

function ItemSection() {

    const [workshop, setWorkshop] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState('')
    const [userId, setUserId] = useState('')

    function addWorkshop(newWorkshop) {
        axios.post('http://localhost:8070/workshops/add', newWorkshop);
        /*setWorkshop(prevWorkshops =>{
            return [...prevWorkshops, newWorkshop]
        });*/
    }

    useEffect(() => {
        const getusertype = async () => {
            const access_token = localStorage.getItem('token')
            console.log(access_token)
            let config = {
              headers: {
                'Authorization': 'Bearer ' + access_token
              }
            }
            axios.get('http://localhost:8070/user/post',config).then((response) => {
                if (response.data.message) {
                  alert(response.data.message)
                } else {
                    console.log(response.data.user._id);
                  setUserType(response.data.user.usertype);
                  setUserId(response.data.user._id)
                    
                }
              })
              .catch()
        };
        getusertype();
        retrieveWorkshops();
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const retrieveWorkshops = async () => {

        /*************************** */
      /*  const access_token = localStorage.getItem('token')
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
                console.log(response.data.user.usertype);
                setUserType(response.data.user.usertype)
                setId(response.data.user._id)


            }
        })
            .catch()*/
        /*****************************************/

        console.log(userId);

        try {
            const data = await axios.get("http://localhost:8070/workshops").then(res => {
                console.log(res.data);
                setWorkshop(res.data)
            });
            setLoading(true)
        } catch (e) {
            console.log(e);
        }
    }


    function workshopDelete(id) {

        axios.delete(`http://localhost:8070/workshops/remove/${id}`).then((res) => {
            console.log("Delete SuccessFully.");
            window.location.reload()
        }).catch((err) => {
            console.log(err);
        });
    }



    return (
        <div className="container">
            <div className="row">
                <div className="itemBox">

                    {loading ? workshop.map((workshopCard, index) => {
                        return (
                            <div >
                            <div className="col-md-12 col-lg-6 col-sm-12" data-aos="zoom-in-up" style={{ cursor: "pointer" }}>
                                <ItemCard
                                    key={index}
                                    id={workshopCard._id}
                                    image={workshopCard.image}
                                    topic={workshopCard.topic}
                                    description={workshopCard.description}
                                    date={workshopCard.date}
                                    time={workshopCard.time}
                                    onDelete={workshopDelete}
                                    getUserType={userType}
                                />
                            </div>
                            </div>
                        )
                    })
                        :
                        <div className="mx-auto" style={{ position: "absolute", top: "40%", right: "35%" ,zIndex:"-99" }}>
                            <LoadingAnimation />
                        </div>
                    }
                </div>

                <div className="col-lg-6" data-aos="zoom-in-up" onClick={handleClickOpen} style={{ cursor: "pointer" }}>
                    <AddCard getUserType={userType} />
                </div>

            </div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>
                    <div className="dialog-title">
                        Lets Schedule a new workshop.
                        <hr className="workshopStyle" />
                    </div>
                </DialogTitle>

                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    /> */}
                    <ItemForm
                        addWorkshops={addWorkshop}

                    />

                </DialogContent>
                <DialogActions>
                    {/*  <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button> */}
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ItemSection;