import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Row } from "react-bootstrap";
import PlaylistCard from '../card/PlaylistCard';

const PlaylistAddModal = (props) => {

    const [playlists, setPlaylists] = useState([]);

    const handleClose = () => props.setShow(false);

    useEffect(() => {
      if (props.show) {
        props.api.getMe().then(meResult => {
          const userId = meResult.id;
           props.api.getUserPlaylists(userId, {"limit" : 50}).then(result => {
            const ownedPlaylists = result.items.filter(playlist => playlist.owner.id === userId);
            console.log(ownedPlaylists);
            const cards = ownedPlaylists.map(item => {
              return (<PlaylistCard api={props.api} playlist={item} songs={props.songs} closeModal={handleClose}/>);
            })
            setPlaylists(cards);
          });
        })
      }
    }, [props.show]);

    // const addToPlaylist = (playlistId) => {
    //   const uris = props.songs.map( s => s.uri);
    //   props.api.addTracksToPlaylist(playlistId, uris).then(addResult => {
    //     console.log("added items to playlist");
    //   })
    //   handleClose();
    // }

    return (
        <>
          <Modal show={props.show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Add to Playlist</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                  <Row xs={2} md={4}>
                    {playlists}
                  </Row>
                </Modal.Body>
            </Form>
          </Modal>
        </>
    );
}

export default PlaylistAddModal;