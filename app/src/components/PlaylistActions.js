import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import AddPlaylistModal from './modal/AddPlaylistModal';
import CreatePlaylistModal from './modal/CreatePlaylistModal';

const PlaylistActions = (props) => {

    const [disabled, setDisabled] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleCreateClick = () => setShowCreateModal(true);
    const handleAddClick = () => setShowAddModal(true);

    useEffect(() => {
        if (props.count > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    })

    function handleCreatePlaylist(songs) {
        
    }

    function handleAddToPlaylist(songs) {

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
            <CreatePlaylistModal 
                show={showCreateModal} 
                setShow={setShowCreateModal}
            />
            <AddPlaylistModal 
                show={showAddModal} 
                setShow={setShowAddModal}
            />
        </>
    );
};

export default PlaylistActions;