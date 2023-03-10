import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import SearchBar from './SearchBar';

const RecommendationForm = (props) => {
    const [bpm, setBpm] = useState('165');
    const [genres, setGenres] = useState('');
    const [track, setTrack] = useState('');

    const bpmChangeHandler = (event) => {
        setBpm(event.target.value);
    };
    const genreChangeHandler = (item) => {
        setGenres(item);
    };
    const trackChangeHandler = (event) => {
        setTrack(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setBpm('165');
        setGenres('');
        setTrack('');

        const seedGenres = genres.map(item => item.value).join(',');

        const recommendationQuery = {
            "seed_genres": seedGenres,
            "target_tempo": bpm
        }

        function parseTrack(track) {
            const result = {
                "image": track.album.images[2].url,
                "artist": track.artists[0].name,
                "title" : track.name,
                "preview": track.preview_url
            };
            return result;
        }

        props.api.getRecommendations(recommendationQuery).then((result) => {
            const parsed = result.tracks.map((track) => parseTrack(track));
            props.setRecommendations(parsed);
        })

        return alert('Values are: ' + bpm + ', ' + genres + ', ' + track);
    };

    return(
        <Alert variant='primary'>
            <Container>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="form.bpm">
                        <Form.Label>BPM</Form.Label>
                        <Form.Control
                            type="number"
                            value={bpm}
                            onChange={bpmChangeHandler}
                            placeholder="Enter BPM"
                        />
                    </Form.Group>
                    <Form.Group controlId="form.genres">
                        <Form.Label>Genres</Form.Label>
                        <SearchBar 
                            options={props.availableGenres}
                            selected={genres}
                            onChange={genreChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group controlId="form.track">
                        <Form.Label>Track</Form.Label>
                        <Form.Control
                            type="number"
                            value={track}
                            onChange={trackChangeHandler}
                            placeholder="Enter Track"
                        />
                    </Form.Group>
                    <Button type='submit'>Find Recommendations</Button>
                </Form>
            </Container>
        </Alert>

    );
}
export default RecommendationForm;