import React, { useState } from 'react';
import { Form, Button, Modal } from "react-bootstrap";

const AddPlaylistModal = (props) => {

    const [name, setName] = useState('');

    const handleClose = () => props.setShow(false);
    const handleName = (event) => setName(event.target.value);

    const addToPlaylist = (event) => {

    }

    return (
        <>
          <Modal show={props.show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Add to Playlist</Modal.Title>
            </Modal.Header>
            <Form onSubmit={addToPlaylist}>
                <Modal.Body>
                    <Form.Group controlId="playlist.name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={handleName}
                                placeholder="Enter Name"
                            />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Add to Playlist
                    </Button>
                </Modal.Footer>
                </Form>
          </Modal>
        </>
    );
}

export default AddPlaylistModal;