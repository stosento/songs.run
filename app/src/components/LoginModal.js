import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";

const LoginModal = (props) => {

    const handleClose = () => props.setShow(false);

    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>How to use songs.run</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This site was built to assist in building a playlist around your running cadence.
                <br/><br/>
                Whether you know your running cadence or just have a song you know you like to run to, this application is meant to assist in finding similar or new music that matches your running style.
                <br/><br/>
                <ol>
                    <li>Login using your Spotify credentials</li>
                    <li>Fill out a quick form to best match your running to music</li>
                    <li>Build a playlist from a curated list of songs that best fits you</li>
                </ol>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" href={"http://localhost:8888/login"}>
                Login with Spotify
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default LoginModal;