import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import TrackInfo from './TrackInfo';

const RecommendationResults = (props) => {
    const rows = props.recommendations.map((rec, index) => {
        return <TrackInfo key={index} track={rec} />;
    })

    return (
        <Container>
            {rows}
        </Container>
    );
}

export default RecommendationResults;