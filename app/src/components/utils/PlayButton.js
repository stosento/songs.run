import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'

const PlayButton = (props) => {

    const onPlay = () => {
        console.log("test", props.uri)
        props.setUris(props.uri)
    }

    return (
        <div onClick={onPlay}>
            <FontAwesomeIcon icon={faCirclePlay} size="xl" />
        </div>
    );
}

export default PlayButton;