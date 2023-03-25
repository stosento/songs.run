import React, { useState } from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';

const PlaylistCard = (props) => {

    console.log("props.playlist", props.playlist);
    const imageUrl = props.playlist.images.length > 0 ? props.playlist.images[0].url : "";


    return (
        <Col>
            <Card style={{ width: '9rem' }}>
                <Card.Img style={{ maxHeight: "144px", objectFit: "cover"}} as={Image} variant="top" src={imageUrl}/>
                <Card.Body>
                <Card.Title style={{fontSize: "12px"}}>{props.playlist.name}</Card.Title>
                {/* <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text> */}
                <Button size="sm" variant="outline-primary">Select</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default PlaylistCard;