import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Row } from "react-bootstrap";
import PlaylistCard from '../card/PlaylistCard';

const PlaylistAddModal = (props) => {

    const [playlists, setPlaylists] = useState({});

    const handleClose = () => props.setShow(false);

    useEffect(() => {
      props.api.getMe().then(meResult => {
        const userId = meResult.id;
        return props.api.getUserPlaylists(userId, {"limit" : 50}).then(result => {
          return setPlaylists(result.items.map(item => {
            return (
              <PlaylistCard playlist={item}/>
            )
          }));
        })
      })
    });

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
                  <Row xs={2} md={4}>
                    {playlists}
                  </Row>
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

export default PlaylistAddModal;