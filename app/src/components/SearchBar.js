import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function SearchBar(props) {

    function handleChange(value) {
        props.onChange(value)
    }

    return (
        <Select 
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={props.options}
            onChange={handleChange}
            value={props.selected}
            isOptionDisabled={() => props.selected.length >= 3}
            isMulti
            isClearable 
        />
    )
}

