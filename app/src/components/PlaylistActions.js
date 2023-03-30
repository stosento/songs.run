import React, { useEffect, useState } from 'react';
import { Container, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import PlaylistAddedAlert from './alert/PlaylistAddedAlert';
import PlaylistCreateAlert from './alert/PlaylistCreateAlert';
import PlaylistAddModal from './modal/PlaylistAddModal';
import PlaylistCreateModal from './modal/PlaylistCreateModal';

const PlaylistActions = (props) => {

    const [disabled, setDisabled] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [createdPlaylist, setCreatedPlaylist] = useState({});
    const [addedPlaylist, setAddedPlaylist] = useState({});

    const handleCreateClick = () => setShowCreateModal(true);
    const handleAddClick = () => setShowAddModal(true);

    useEffect(() => {
        if (props.songs.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    })

    const createdPlaylistCallback = (playlist) => {
        setCreatedPlaylist(playlist);
        props.setAlert(<PlaylistCreateAlert playlist={playlist}/>);
        setTimeout(() => {
            props.setAlert(<></>);
        }, 5000);
    }

    const addedToPlaylistCallback = (playlist) => {
        setAddedPlaylist(playlist);
        props.setAlert(<PlaylistAddedAlert playlist={playlist}/>);
        setTimeout(() => {
            props.setAlert(<></>);
        }, 5000);
    }

    return (
        <>  
            <Button 
                size="sm" 
                variant={disabled ? "outline-primary" : "primary"}
                className='float-start' 
                disabled={disabled}
                onClick={handleCreateClick}
            >
                Create New Playlist
            </Button>

            <Button 
                size="sm" 
                variant={disabled ? "outline-primary" : "primary"}
                className='float-start' 
                disabled={disabled}
                onClick={handleAddClick}
            >
                Add to Existing Playlist
            </Button>

            <PlaylistCreateModal 
                show={showCreateModal} 
                setShow={setShowCreateModal}
                api={props.api}
                songs={props.songs}
                callback={createdPlaylistCallback}
            />
            {/* <PlaylistCreateAlert
                playlist={createdPlaylist}
            /> */}

            <PlaylistAddModal 
                show={showAddModal} 
                setShow={setShowAddModal}
                api={props.api}
                songs={props.songs}
                callback={addedToPlaylistCallback}
            />   
        </>
    );
};

export default PlaylistActions;