import { useState } from "react";
import { Button } from "react-bootstrap";
import LoginModal from "./modal/LoginModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import Footer from "./Footer";

const Login = () => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const url = process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8888/login'
        : 'https://mytempo.run/login';

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-col h-3/4">
                <h1>
                    <span className="font-extralight">my</span>
                    <span className="font-semibold">tempo</span>
                    <span className="font-extralight">.run</span>
                </h1>
                <Button className="mb-2" variant="outline-success" href={url}>
                    <FontAwesomeIcon icon={faSpotify} /> Connect to Spotify
                </Button>
                <Button className="mb-2" variant="outline-secondary" onClick={handleShow}>
                    What is this?
                </Button>
                <Footer/>
                <LoginModal show={show} setShow={setShow}/>
            </div>
        </div>
    );
}

export default Login;