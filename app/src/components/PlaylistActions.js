import React, { useEffect, useState } from 'react';
import { Container, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import AddPlaylistModal from './modal/AddPlaylistModal';
import CreatePlaylistModal from './modal/CreatePlaylistModal';

const PlaylistActions = (props) => {

    const [disabled, setDisabled] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleCreateClick = () => setShowCreateModal(true);
    const handleAddClick = () => setShowAddModal(true);

    useEffect(() => {
        if (props.songs.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    })

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

            <CreatePlaylistModal 
                show={showCreateModal} 
                setShow={setShowCreateModal}
                api={props.api}
                songs={props.songs}
            />
            <AddPlaylistModal 
                show={showAddModal} 
                setShow={setShowAddModal}
                api={props.api}
                songs={props.songs}
            />
        </>
    );
};

export default PlaylistActions;