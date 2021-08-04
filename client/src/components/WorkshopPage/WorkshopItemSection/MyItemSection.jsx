import React, {useEffect, useState} from "react";
import AddCard from './WorkshopAddCard';
import ItemCard from './WorkshopItemCard'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../Styles/itemSection.css";
import ItemForm from './ItemForm';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'
import LoadingAnimation from "./LoadingAnimation";

import AOS from 'aos';
import '../../../../node_modules/aos/dist/aos.css'; // You can also use <link> for styles


AOS.init();

function MyItemSection() {

    const [workshop, setWorkshop] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userType, seTuserType] = useState('')

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


        retrieveWorkshops();
    }, []);

    const retrieveWorkshops = async () => {
        try {
            const data = await axios.get("http://localhost:8070/workshops/accepted",).then(res => {
                setWorkshop(res.data)
            });
            setLoading(true)
        } catch (e) {
            console.log(e);
        }
    }





    return (
        <div style={{height:"90vh"}}>
        <div className="container">
            <div className="row">


                <div className="itemBox">

                    {loading ? workshop.map((workshopCard, index) => {
                        return (
                            <div className="col-md-6 col-lg-4 col-sm-12" style={{ cursor: "pointer" }}>
                                <ItemCard
                                    key={index}
                                    id={workshopCard._id}
                                    image={workshopCard.image}
                                    topic={workshopCard.topic}
                                    description={workshopCard.description}
                                    date={workshopCard.date}
                                    time={workshopCard.time}
                                    getUserType={userType}
                                />
                            </div>
                        )
                    })
                        :
                        <div className="mx-auto" style={{ position: "absolute", top: "40%", right: "35%" ,zIndex:"-99" }}>
                            <LoadingAnimation />
                        </div>
                    }
                </div>

            </div>

        </div>

        </div>
    )
}

export default MyItemSection;