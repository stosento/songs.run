import { useState } from "react";
import { Button } from "react-bootstrap";
import LoginModal from "./modal/LoginModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
const Login = () => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const url = process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8888/login'
        : 'https://mytempo-run.herokuapp.com/login';

    return (
        <div>
            <h1>
                my<b>tempo</b>.run
            </h1>
            <Button className="mb-2" variant="outline-success" href={"http://localhost:8888/login"}>
                <FontAwesomeIcon icon={faSpotify} /> Connect to Spotify
            </Button>
            <br></br>
            <Button variant="outline-secondary" onClick={handleShow}>
                What is this?
            </Button>
            <LoginModal show={show} setShow={setShow}/>
        </div>
    );
}

export default Login;