import React, { useState } from 'react';
import { Form, Button, Container, Alert, Col, Row } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import SearchBar from './SearchBar';

const RecommendationForm = (props) => {
    const [bpm, setBpm] = useState('165');
    const [genres, setGenres] = useState('');
    const [inputTrack, setInputTrack] = useState('');
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [inputArtist, setInputArtist] = useState('');
    const [selectedArtist, setSelectedArtist] = useState(null);

    const bpmChangeHandler = (event) => {
        setBpm(event.target.value);
    };
    const genreChangeHandler = (item) => {
        setGenres(item);
    };

    const handleArtistInputChange = value => {
        setInputArtist(value);
    };
    const handleArtistChange = value => {
        setSelectedArtist(value);
    };

    const handleTrackInputChange = value => {
        setInputTrack(value);
    };
    const handleTrackChange = value => {
        setSelectedTrack(value);
    };

    const loadArtists = inputArtist => {
        return props.api.search(inputArtist, ["artist"]).then(result => {
            const res = result.artists.items.map((item) => ({
                value : item.id,
                label : item.name  
            }));
            console.log(res);
            return res;
        });
    }

    const loadTracks = inputTrack => {
        return props.api.search(inputTrack, ["track"]).then(result => {
            const res = result.tracks.items.map((item) => ({
                value : item.id,
                label : item.name + " - " + item.artists[0].name
            }));
            console.log(res);
            return res;
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();

        setBpm('165');
        setGenres('');
        setSelectedTrack('');
        setSelectedArtist('');

        const seedGenres = genres.map(item => item.value).join(',');

        const recommendationQuery = {
            "seed_genres": seedGenres,
            "seed_artists": selectedArtist.value,
            "seed_tracks": selectedTrack.value,
            "target_tempo": bpm
        }

        function parseTrack(track, analysis) {
            const result = {
                "image": track.album.images[2].url,
                "artist": track.artists[0].name,
                "title" : track.name,
                "preview": track.preview_url,
                "bpm": analysis.tempo
            };
            return result;
        }

        props.api.getRecommendations(recommendationQuery).then((trackResult) => {
            
            const parsed = trackResult.tracks.map((track) => {
                return props.api.getAudioFeaturesForTrack(track.id).then((analysisResult) => {
                    return parseTrack(track, analysisResult);
                });
            });
            
            Promise.all(parsed).then((results) => {
                props.setRecommendations(results);
            });
        })
    };

    return(
        <Alert variant='primary'>
            <Container>
                <Form onSubmit={submitHandler}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="form.bpm">
                                <Form.Label>BPM</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={bpm}
                                    onChange={bpmChangeHandler}
                                    placeholder="Enter BPM"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="form.genres">
                                <Form.Label>Genres</Form.Label>
                                <SearchBar 
                                    options={props.availableGenres}
                                    selected={genres}
                                    onChange={genreChangeHandler}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="form.track">
                                <Form.Label>Track Search</Form.Label>
                                <AsyncSelect
                                    cacheOptions
                                    placeholder="Search for Track"
                                    value={selectedTrack}
                                    loadOptions={loadTracks}
                                    onInputChange={handleTrackInputChange}
                                    onChange={handleTrackChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="form.artist">
                                <Form.Label>Artist Search</Form.Label>
                                <AsyncSelect
                                    cacheOptions
                                    value={selectedArtist}
                                    placeholder="Search for Artist"
                                    loadOptions={loadArtists}
                                    onInputChange={handleArtistInputChange}
                                    onChange={handleArtistChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type='submit'>Find Recommendations</Button>
                </Form>
            </Container>
        </Alert>

    );
}
export default RecommendationForm;