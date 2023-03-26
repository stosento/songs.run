import React, { useState } from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';

const PlaylistCard = (props) => {

    const imageUrl = props.playlist.images.length > 0 ? props.playlist.images[0].url : "";

    const addToPlaylist = () => {
        const uris = props.songs.map( s => s.uri);
        props.api.addTracksToPlaylist(props.playlist.id, uris).then(addResult => {
          console.log("added items to playlist");
        });
        props.closeModal();
      }

    return (
        <Col>
            <Card style={{ width: '9rem' }}>
                <Card.Img style={{ maxHeight: "144px", objectFit: "cover"}} as={Image} variant="top" src={imageUrl}/>
                <Card.Body>
                <Card.Title style={{fontSize: "12px"}}>{props.playlist.name}</Card.Title>
                <Button size="sm" variant="outline-primary" onClick={addToPlaylist}>Select</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default PlaylistCard;