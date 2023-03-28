import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PlaylistActions from './PlaylistActions';

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
        grow: 1
    },
    {
        name: 'BPM',
        selector: row => row.bpm,
        sortable: true,
        grow: 0
    },
    {
        name: 'Danceability',
        selector: row => row.danceability,
        sortable: true,
        grow: 0
    },
    {
        name: 'Energy',
        selector: row => row.energy,
        sortable: true,
        grow: 0
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
        "danceability": item.danceability,
        "energy": item.energy,
        "preview": <audio controls controlsList="nodownload noplaybackrate" src={item.preview}/>,
        "uri": item.uri
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
            id : row.id,
            uri : row.uri
        })))
        selectedRows.length > 0 ? setShowButtons(true) : setShowButtons(false);
    };

    const handleRowClick = row => {
        window.open(row.url, "_blank");
    };

    const customTableStyles = {
        table: {
            style: {
                backgroundColor: "rgba(255, 0, 0, 0.9)"
            }
        }
    }

    return (
        <Container>
            <PlaylistActions 
                songs={songs}
                api={props.api}
                setAlert={props.setAlert}
            />
            <DataTable
                customStyles={customTableStyles}
                columns={columns}
                data={rows}
                pagination
                paginationPerPage={20}
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