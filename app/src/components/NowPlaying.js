function getNowPlaying(api, setNowPlaying) {
    api.getMyCurrentPlaybackState().then((response) => {
        setNowPlaying({
            name: response.item.name,
            albumArt: response.item.album.images[0].url
        })
    })
}

export default function NowPlaying(props) {
    return (
        <div>
            <div>
                Now Playing - {props.trackInfo.name}
            </div>
            <div>
                <img src={props.trackInfo.albumArt} style={{height: 150}}/>
            </div>
            <button onClick={() => getNowPlaying(props.api, props.onClick)}>Check Now Playing</button>
        </div>
    );
}