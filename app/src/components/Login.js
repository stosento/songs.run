import { useState } from "react";
import { Button } from "react-bootstrap";
import LoginModal from "./LoginModal";

const Login = () => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <h1>
                songs.run
            </h1>
            <Button variant="outline-success" href={"http://localhost:8888/login"}>
                Login to Spotify
            </Button>
            <Button onClick={handleShow}>
                What is this?
            </Button>
            <LoginModal show={show} setShow={setShow}/>
        </div>
    );
}

export default Login;