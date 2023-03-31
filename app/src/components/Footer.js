import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {

    const twitterUrl = "https://twitter.com/stephentoski";
    const githubUrl = "https://github.com/stosento";
    const buyCoffeeUrl = "https://www.buymeacoffee.com/stosento";

    return (
        <div className="flex flex-col h-1/4">
            <div className="row-auto">
                <a className="text-white opacity-50 mx-2" href={twitterUrl} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a className="text-white opacity-50 mx-2" href={githubUrl} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a className="text-white opacity-50 mx-2" href={buyCoffeeUrl} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faMugSaucer} />
                </a>
            </div>
        </div>
    );
}

export default Footer;