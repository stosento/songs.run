import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

const CreatePlaylistModal = (props) => {

    const [name, setName] = useState('');

    const handleClose = () => props.setShow(false);
    const handleName = (event) => setName(event.target.value);

    const createPlaylist = (event) => {
      event.preventDefault();

      const uris = props.songs.map( s => s.uri);
      console.log("uris", uris);

      props.api.getMe().then(meResult => {
        const userId = meResult.id;
        props.api.createPlaylist(userId, {"name" : name}).then(result => {
          console.log("result", result);
          const playlistId = result.id;
          props.api.addTracksToPlaylist(playlistId, uris).then(result => {
            console.log("added items to playlist");
          }); 
        });
      });
    }

    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Playlist</Modal.Title>
            </Modal.Header>
            <Form onSubmit={createPlaylist}>
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
                <Button variant="primary" onClick={createPlaylist}>
                  Create Playlist
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      );
}

export default CreatePlaylistModal;