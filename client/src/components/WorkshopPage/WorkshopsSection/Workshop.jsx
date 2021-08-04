import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import axios from "axios";

function Workshop(){

    /*const [details, setDetails] = useState({
        topic: "",
        description: "",
        date: ""
    });

    const [submitText, setSubmitText] = useState({
        topic: details.topic,
        description: details.description,
        date: details.date
    });

    function getDetails(event){
        const {name, value} = event.target;

        setDetails(storedVal =>{
            if(name === "title"){
                return{
                    topic: value,
                    description: storedVal.description,
                    date: storedVal.date
                }
            }else if(name === "description"){
                return{
                    topic: storedVal.topic,
                    description: value,
                    date: storedVal.date
                }
            }else if(name === "date"){
                return{
                    topic: storedVal.topic,
                    description: storedVal.description,
                    date: value
                }
            }
        });
    }

    function clickEventFunc(event){
        event.preventDefault();
        setSubmitText({
            topic: details.topic,
            description: details.description,
            date: details.date
        });

        console.log(submitText);

        axios.post("http://localhost:3000/workshops/add", submitText).then(()=>{
            alert("Workshop added.")
        }).catch((err)=>{
            alert(err);
        });
    }

    /*axios.post("http://localhost:3000/newWorkshopAdd",submitText).then(()=>{
        alert("Workshop added.")
    }).catch((err)=>{
        alert(err);
    });*/

   /* axios({
        method: "POST",
        url: "/newWorkshopAdd",
        data: {
            topic: details.topic,
            description: details.description,
            date: details.date
        },
        withCredentials: true
    }).then(()=>{
        alert("Workshop added.")
    }).catch((err)=>{
        alert(err);
    });*/


    /*
    axios({
        method: "post",
        url: "/auth/register",
        data: {
            username: this.state.username,
            password: this.state.password,
            accountName: this.state.accountName
        },
        withCredentials: true
    }).then(result => {
        console.log(result);
    });

    return <div className="container">
        <Form onSubmit={clickEventFunc}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" name="title" value={details.topic} onChange={getDetails} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" name="description" value={details.description} onChange={getDetails} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" placeholder="Date" name="date" value={details.date} onChange={getDetails} />
            </Form.Group>
            <Button variant="contained" type="submit" color="primary">
                Submit
            </Button>
        </Form>
    </div>;*/
}

export default Workshop;