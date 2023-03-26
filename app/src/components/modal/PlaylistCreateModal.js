import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

const PlaylistCreateModal = (props) => {

    const [name, setName] = useState('');

    const handleClose = () => props.setShow(false);
    const handleName = (event) => setName(event.target.value);

    const createPlaylist = (event) => {
      event.preventDefault();

      const uris = props.songs.map( s => s.uri);
      let playlistResult = "";

      props.api.getMe().then(meResult => {
        const userId = meResult.id;
        props.api.createPlaylist(userId, {"name" : name}).then(result => {
          const playlistId = result.id;
          playlistResult = result;
          props.api.addTracksToPlaylist(playlistId, uris).then(result => {
            props.callback(playlistResult);
          }); 
        });
      });

      handleClose();
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

export default PlaylistCreateModal;