import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal } from "react-bootstrap";

const PlaylistAddedAlert = (props) => {

    return (
        <Alert variant="success">
            Playlist{' '}
            <Alert.Link href={props.playlist.external_urls.spotify}>{props.playlist.name}</Alert.Link> 
            {' '}has been appended with your songs!
        </Alert>
      );
}

export default PlaylistAddedAlert;