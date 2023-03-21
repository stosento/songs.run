import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import TrackInfo from './TrackInfo';
import DataTable from 'react-data-table-component';


const columns = [
    {
        name: 'Thumbnail',
        selector: row => row.image,
        grow: 0
    },
    {
        name: 'Artist',
        selector: row => row.artist,
        sortable: true,
        grow: 1
    },
    {
        name: 'Song',
        selector: row => row.song,
        sortable: true,
        grow: 2
    },
    {
        name: 'BPM',
        selector: row => row.bpm,
        sortable: true,
        grow: 1
    },
    {
        name: 'Preview',
        selector: row => row.preview,
        grow: 2
    }
];

function makeRow(item) {
    const row = {
        "id": item.id,
        "image": <img src={item.image} style={{height: 64}}/>,
        "artist": item.artist,
        "song": item.title,
        "url": item.url,
        "bpm": Math.round(item.bpm),
        "preview": <audio controls src={item.preview}/>
    };
    return row;
}

const RecommendationResults = (props) => {

    const [songs, setSongs] = useState([]);
    const [showButtons, setShowButtons] = useState(false);

    let rows = [];
    props.recommendations.forEach(rec => {
        rows.push(makeRow(rec));
    });

    const handleChange = ({ selectedRows }) => {
        setSongs(selectedRows.map(row => ({
            id : row.id
        })))
        selectedRows.length > 0 ? setShowButtons(true) : setShowButtons(false);
    };

    const handleRowClick = row => {
        window.open(row.url, "_blank");
    };

    return (
        <Container>
            {showButtons && <Button>Add to Playlist</Button>}
            <DataTable
                columns={columns}
                data={rows}
                pagination
                selectableRows
                striped           
                highlightOnHover
                pointerOnHover
                onSelectedRowsChange={handleChange}
                onRowClicked={handleRowClick}
            />
        </Container>
    );
}

export default RecommendationResults;