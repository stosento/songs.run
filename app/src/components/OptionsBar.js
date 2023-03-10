import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const OptionsBar = (props) => {

    const [genres, setGenres] = useState('');

    const genreChangeHandler = (item) => {
        setGenres(item);
    }

    return (
        <Select 
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={props.options}
            onChange={genreChangeHandler}
            value={genres}
            isMulti
            isClearable 
        />
    )
}

export default OptionsBar;

