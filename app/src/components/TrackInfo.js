import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const TrackInfo = (props) => {
    return (
        <Row key={props.index}>
            <Col><img src={props.track.image} style={{height: 64}}/></Col>
            <Col>{props.track.artist}</Col>
            <Col>{props.track.title}</Col>
            <Col><audio controls src={props.track.preview}/></Col>
        </Row>
    );
}

export default TrackInfo;