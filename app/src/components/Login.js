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
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-col">
                <h1>
                    my<b>tempo</b>.run
                </h1>
                <Button className="mb-2" variant="outline-success" href={url}>
                    <FontAwesomeIcon icon={faSpotify} /> Connect to Spotify
                </Button>
                <Button variant="outline-secondary" onClick={handleShow}>
                    What is this?
                </Button>
                <LoginModal show={show} setShow={setShow}/>
            </div>
        </div>
    );
}

export default Login;