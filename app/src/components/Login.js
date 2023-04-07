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

    const handleLogin = () => window.location.replace(url);

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-col h-3/4">
                <h1>
                    <span className="font-extralight">my</span>
                    <span className="font-semibold">tempo</span>
                    <span className="font-extralight">.run</span>
                </h1>
{/* 
                <a href={url}> */}
                    <button onClick={handleLogin} className="transition opacity-70 py-1.5 px-4 my-1.5 rounded outline outline-1 outline-[#1DB954] text-[#1DB954] hover:text-white hover:bg-[#1DB954] hover:opacity-100">
                        <FontAwesomeIcon icon={faSpotify} /> Connect to Spotify
                    </button>
                {/* </a> */}

                {/* <a href={url}>
                    <button className="transition opacity-70 py-1.5 px-4 my-1.5 rounded outline outline-1 outline-[#F44B04] text-[#F44B04] hover:text-white hover:bg-[#F44B04] hover:opacity-100">
                        <FontAwesomeIcon icon={faStrava} /> Connect to Strava
                    </button>
                </a> */}

                <button onClick={handleShow} className="transition opacity-70 py-1.5 px-4 my-1.5 rounded outline outline-1 outline-gray-500 text-gray-500 hover:text-white hover:bg-gray-500 hover:opacity-100 hover:outline-gray-500">
                    What is this
                </button>

                <Footer/>
                <LoginModal show={show} setShow={setShow}/>
            </div>
        </div>
    );
}

export default Login;