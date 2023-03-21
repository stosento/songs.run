import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import TrackInfo from './TrackInfo';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Thumbnail',
        selector: row => row.image,
    },
    {
        name: 'Artist',
        selector: row => row.artist,
        sortable: true
    },
    {
        name: 'Song',
        selector: row => row.song,
        sortable: true
    },
    {
        name: 'BPM',
        selector: row => row.bpm,
        sortable: true
    },
    {
        name: 'Preview',
        selector: row => row.preview,
    }
];

function makeRow(item) {
    const row = {
        "id": item.id,
        "image": <img src={item.image} style={{height: 64}}/>,
        "artist": item.artist,
        "song": item.title,
        "bpm": Math.round(item.bpm),
        "preview": <audio controls src={item.preview}/>
    };
    return row;
}

const RecommendationResults = (props) => {

    const [songs, setSongs] = useState([]);

    let rows = [];
    props.recommendations.forEach(rec => {
        rows.push(makeRow(rec));
    });

    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        setSongs(selectedRows.map(row => ({
            id : row.id
        })))
    };

    const handleClick = ({}) => {
        
    }

    return (
        <DataTable
            columns={columns}
            data={rows}
            pagination
            selectableRows
            onSelectedRowsChange={handleChange}
            striped           
            highlightOnHover
            pointerOnHover
        />
    );
}

export default RecommendationResults;