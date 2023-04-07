import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'

const PlayButton = (props) => {

    const onPlay = () => {
        props.setUris(props.uri)
    }

    return (
        <div onClick={onPlay}>
            <FontAwesomeIcon icon={faCirclePlay} size="2xl" />
        </div>
    );
}

export default PlayButton;