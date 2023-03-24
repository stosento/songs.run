import React, { useState } from 'react';
import { Alert, Button, Form, Modal } from "react-bootstrap";

const PlaylistCreateAlert = (props) => {

    return (
        <Alert variant="success">
            Playlist 
            <Alert.Link href="{props.playlist.url}">{props.playlist.name}</Alert.Link> 
            has been created!
        </Alert>
      );
}

export default PlaylistCreateAlert;