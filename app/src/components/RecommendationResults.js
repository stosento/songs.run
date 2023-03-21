import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import TrackInfo from './TrackInfo';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
];


const data = [
    {
        id: 1,
        title: <audio controls src={"props.track.preview"}/>,
        year: '1988',
    },
    {
        id: 2,
        title: <audio controls src={"props.track.preview"}/>,
        year: '1984',
    },
]

const RecommendationResults = (props) => {
    const rows = props.recommendations.map((rec, index) => {
        return <TrackInfo key={index} track={rec} />;
    })

    return (
        <>
        <Container>
            {rows}
        </Container>
        <DataTable
            columns={columns}
            data={data}
        />
        </>
    );
}

export default RecommendationResults;