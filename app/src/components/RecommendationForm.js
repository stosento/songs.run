import React, { useState } from 'react';
import { Form, Button, Container, Alert, Col, Row } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import SearchBar from './SearchBar';
import MaterialSlider from './utils/MaterialSlider';

const RecommendationForm = (props) => {
    const [bpm, setBpm] = useState([50, 150]);
    const [genres, setGenres] = useState('');
    const [inputTrack, setInputTrack] = useState('');
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [inputArtist, setInputArtist] = useState('');
    const [selectedArtist, setSelectedArtist] = useState(null);

    const bpmChangeHandler = (event, data) => {
        setBpm(data);
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
            return res;
        });
    }

    const loadTracks = inputTrack => {
        return props.api.search(inputTrack, ["track"]).then(result => {
            const res = result.tracks.items.map((item) => ({
                value : item.id,
                label : item.name + " - " + item.artists[0].name
            }));
            return res;
        });
    }

    const resetForm = (event) => {
        setBpm([100, 200]);
        setGenres('');
        setSelectedArtist('');
        setSelectedTrack('');
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const seedGenres = genres.map(item => item.value).join(',');

        console.log("selectedArtist", selectedArtist);
        console.log("selectedTrack", selectedTrack);

        const recommendationQuery = {
            "seed_genres": seedGenres,
            "seed_artists": selectedArtist.value,
            "seed_tracks": selectedTrack.value,
            "min_tempo": bpm[0],
            "max_tempo": bpm[1],
            "limit": 50
        }

        console.log("query", recommendationQuery)

        function parseTrack(track, analysis) {
            const result = {
                "id": track.id,
                "image": track.album.images[2].url,
                "artist": track.artists[0].name,
                "title" : track.name,
                "url" : track.external_urls.spotify,
                "preview": track.preview_url,
                "bpm": analysis.tempo,
                "danceability": analysis.danceability,
                "energy": analysis.energy,
                "uri": track.uri
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
        <Container>
            <Form onSubmit={submitHandler}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="form.bpm">
                            <Form.Label>BPM</Form.Label>
                            <MaterialSlider
                                min={0}
                                max={200}
                                value={bpm}
                                onChange={bpmChangeHandler}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="form.genres">
                            <Form.Label>Genres</Form.Label>
                            <SearchBar 
                                options={props.availableGenres}
                                selected={genres}
                                placeholder="Select Genres"
                                onChange={genreChangeHandler}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="form.artist">
                            <Form.Label>Artist</Form.Label>
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
                    <Col>
                        <Form.Group controlId="form.track">
                            <Form.Label>Track</Form.Label>
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
                </Row>
                <Button className='m-1' variant='secondary' onClick={resetForm}>Reset</Button>
                <Button type='submit'>Find Recommendations</Button>
            </Form>
        </Container>
    );
}
export default RecommendationForm;