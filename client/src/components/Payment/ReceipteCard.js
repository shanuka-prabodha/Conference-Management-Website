import React from 'react';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';

function ReceiptCard(props) {
    return (
        <div>
          
            <Paper elevation={7} style = {{width:"300px",marginTop:"2%", padding:"2% 0"}}>

            {(props.paytype=="ticket") &&
            <Typography variant="subtitle1"><strong>Pay Amount : Rs.2000/=</strong> {props.amount}</Typography>
            }
            
            {(props.paytype=="paper") &&
            <Typography variant="subtitle1"><strong>Pay Amount : Rs.12000/=</strong> {props.amount}</Typography>
            }
            
            </Paper>
        </div>
    )

}

export default ReceiptCard;