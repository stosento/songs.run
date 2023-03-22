import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";

const CreatePlaylistModal = (props) => {

    const handleClose = () => props.setShow(false);

    function createPlaylist(songs) {

    }

    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={createPlaylist}>
                Create Playlist
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default CreatePlaylistModal;