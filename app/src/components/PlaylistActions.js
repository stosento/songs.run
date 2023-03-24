import React, { useEffect, useState } from 'react';
import { Container, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import PlaylistCreateAlert from './alert/PlaylistCreateAlert';
import PlaylistAddModal from './modal/PlaylistAddModal';
import PlaylistCreateModal from './modal/PlaylistCreateModal';

const PlaylistActions = (props) => {

    const [disabled, setDisabled] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [showCreatedAlert, setShowCreatedAlert] = useState(false);
    const [createdPlaylist, setCreatedPlaylist] = useState({});

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
        setShowCreatedAlert(true);
        setCreatedPlaylist(playlist);
    }

    return (
        <>  
            <Button 
                size="sm" 
                variant="outline-primary" 
                className='float-start' 
                disabled={disabled}
                onClick={handleCreateClick}
            >
                Create New Playlist
            </Button>

            <Button 
                size="sm" 
                variant="outline-primary" 
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
            />
        </>
    );
};

export default PlaylistActions;