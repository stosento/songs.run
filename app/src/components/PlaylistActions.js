import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';

const PlaylistActions = (props) => {

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (props.count > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    })

    return (
        <>  
            <Button size="sm" variant="outline-primary" className='float-start' disabled={disabled}>Create New Playlist</Button>
            <Button size="sm" variant="outline-primary" className='float-start' disabled={disabled}>Add to Existing Playlist</Button>
        </>
    );
};

export default PlaylistActions;