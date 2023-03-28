import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert, Col, Row, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
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

    const [bpmDisabled, setBpmDisabled] = useState(false);
    const [searchDisabled, setSearchDisabled] = useState(true);

    useEffect(() => {
        updateSearchEnabled(bpm, selectedArtist, selectedTrack, genres);
    })

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

    const updateSearchEnabled = (bpm, selectedArtist, selectedTrack, genres) => {
        let disabled = bpm ? (!selectedArtist && !selectedTrack && !genres) : !selectedTrack;
        setSearchDisabled(disabled);
    };

    const updateBpmEnabled = value => {
        setBpmDisabled(value);
    }

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
        setBpm([50, 150]);
        setGenres('');
        setSelectedArtist('');
        setSelectedTrack('');
    }

    const generateTempoQuery = async (bpm, bpmDisabled, selectedTrack) => {
        let query = {};
        if (bpmDisabled) {
            let bpm = await props.api.getAudioFeaturesForTrack(selectedTrack.value).then((analysisResult) => {
                return Math.round(analysisResult.tempo)
            });
            query = {
                "min_tempo": bpm - 10,
                "max_tempo": bpm + 10
            }            
        } else {
            query = {
                "min_tempo": bpm[0],
                "max_tempo": bpm[1]
            }
        }
        console.log("query", query);
        return query;
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const seedGenres = genres.map(item => item.value).join(',');

        const musicQuery = {
            "seed_genres": seedGenres ? seedGenres : '',
            "seed_artists": selectedArtist ? selectedArtist.value : '',
            "seed_tracks": selectedTrack ? selectedTrack.value : '',
            "limit": 50
        }
        const tempoQuery = await generateTempoQuery(bpm, bpmDisabled, selectedTrack);
        const searchQuery = {...musicQuery, ...tempoQuery};
        
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

        props.api.getRecommendations(searchQuery).then((trackResult) => {
            
            let arr = [];

            const trackIds = trackResult.tracks.map(track => track.id);
            props.api.getAudioFeaturesForTracks(trackIds).then((analysisResult) => {
                analysisResult.audio_features.forEach((analysis, index) => {
                    arr.push(parseTrack(trackResult.tracks[index], analysis));
                })
                props.setRecommendations(arr);
            });
        })
    };

    return(
        <div className="mx-auto lg:w-1/2">
            <Form onSubmit={submitHandler}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group as={Row} controlId="form.bpm">
                            <Form.Label className="text-end" column sm={3}>Set your target <b>tempo</b> : </Form.Label>
                            <Col sm={7}>
                                <MaterialSlider
                                    min={0}
                                    max={200}
                                    value={bpm}
                                    onChange={bpmChangeHandler}
                                    disabled={bpmDisabled}
                                />
                            </Col>
                            <Col sm={2}>
                                <ToggleButtonGroup type="radio" name="options" defaultValue={false} onChange={updateBpmEnabled}>
                                    <ToggleButton 
                                        id="tbg-btn-1" 
                                        size="sm" 
                                        value={false} 
                                        variant="outline-success" 
                                    >
                                        Enabled
                                    </ToggleButton>
                                    <ToggleButton 
                                        id="tbg-btn-2" 
                                        size="sm" 
                                        value={true} 
                                        variant="outline-danger"
                                    >
                                        Disabled
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group as={Row} controlId="form.artist">
                            <Form.Label className="text-end" column sm={3}>Search for an <b>artist</b> you like :</Form.Label>
                            <Col sm={9}>
                                <AsyncSelect
                                    isClearable
                                    cacheOptions
                                    value={selectedArtist}
                                    placeholder="Search..."
                                    loadOptions={loadArtists}
                                    onInputChange={handleArtistInputChange}
                                    onChange={handleArtistChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group as={Row} controlId="form.track">
                            <Form.Label className="text-end" column sm={3}>Search for a <b>song</b> you like :</Form.Label>
                            <Col sm={9}>
                                <AsyncSelect
                                    isClearable
                                    cacheOptions
                                    placeholder="Search..."
                                    value={selectedTrack}
                                    loadOptions={loadTracks}
                                    onInputChange={handleTrackInputChange}
                                    onChange={handleTrackChange}
                                /> 
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group as={Row} controlId="form.genres">
                            <Form.Label className="text-end" column sm={3}>Add a few <b>genres</b> :</Form.Label>
                            <Col sm={9}>
                                <SearchBar 
                                    options={props.availableGenres}
                                    selected={genres}
                                    placeholder="Search..."
                                    onChange={genreChangeHandler}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className='m-1' variant='secondary' onClick={resetForm}>Reset</Button>
                <Button type='submit' disabled={searchDisabled}>Find Recommendations</Button>
            </Form>
        </div>
    );
}
export default RecommendationForm;