import { useState } from "react";
import { Button } from "react-bootstrap";
import LoginModal from "./modal/LoginModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faStrava } from '@fortawesome/free-brands-svg-icons'
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

                <a href={url}>
                    <button className="w-auto transition opacity-70 py-1.5 px-4 my-1.5 rounded outline outline-1 outline-[#1DB954] text-[#1DB954] hover:text-white hover:bg-[#1DB954] hover:opacity-100">
                        <FontAwesomeIcon icon={faSpotify} /> Connect to Spotify
                    </button>
                </a>

                <a href={url}>
                    <button className="w-fill transition opacity-70 py-1.5 px-4 my-1.5 rounded outline outline-1 outline-[#F44B04] text-[#F44B04] hover:text-white hover:bg-[#F44B04] hover:opacity-100">
                        <FontAwesomeIcon icon={faStrava} /> Connect to Strava
                    </button>
                </a>

                <Button className="mb-2" variant="outline-success" href={url}>
                    <FontAwesomeIcon icon={faSpotify} /> Connect to Spotify
                </Button>
                <Button className="mb-2" variant="outline-success" href={url}>
                    <FontAwesomeIcon icon={faStrava} /> Connect to Strava
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