import React from 'react';
import emailjs from 'emailjs-com';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { UilEnvelopeCheck } from '@iconscout/react-unicons'
import { ThemeProvider, makeStyles, createMuiTheme, } from '@material-ui/core/styles';
import "../../Styles/card.css";
import AOS from 'aos';
import '../../../../node_modules/aos/dist/aos.css'; // You can also use <link> for styles

AOS.init();
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1.5),
        width: '400px'
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#5E4FA2",
        },
    },
});

const buttonColor = {
    backgroundColor: "#5E4FA2",
    color: "white",
    fontFamily: "Poppins",
    borderRadius: "7px",
    margin: "1% 0",
    width: "fit-content"
}

function ContactUs() {

    function sendEmail(e) {

        emailjs.sendForm('service_2p0zvir', 'template_vlnqhcu', e.target, 'user_c1KolLNozfxB1W9qmfVsI')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        e.target.reset();
        e.preventDefault();
    }

    const classes = useStyles();
    return (
        <div id="contact" data-aos="fade-up">
            <div className="cardTitle" style={{textAlign:"center"}}>
                Contact us...
                <hr className="workshopStyle" style={{width:"180px"}} />
            </div>

            <form className="contact-form" name="New_Email" onSubmit={sendEmail}>

                <ThemeProvider theme={theme}>
                    <div>
                        <TextField name="name" id="mui-theme-provider-outlined-input" className={classes.margin} label="Name" variant="outlined" fullWidth size="small" />
                    </div>
                    <div>
                        <TextField name="email" id="mui-theme-provider-outlined-input" className={classes.margin} label="Email" variant="outlined" fullWidth size="small" />
                    </div>
                    <div>
                        <TextField name="subject" id="mui-theme-provider-outlined-input" className={classes.margin} label="Subject" variant="outlined" fullWidth size="small" />
                    </div>
                    <div>
                        <TextField name="message" id="mui-theme-provider-outlined-input" className={classes.margin} multiline rows={4} label="Message" variant="outlined" fullWidth size="small" />
                    </div>

                </ThemeProvider>
                <Button type="submit" size="large" variant="contained" style={buttonColor}>Contact <UilEnvelopeCheck style={{ marginLeft: "4%" }} /> </Button>


            </form>
        </div>
    );
}

export default ContactUs;