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
            styles={{
                    option: (base) => ({
                        ...base,
                        color: 'black'
                    }),
                    multiValue: (base) => ({
                        ...base,
                        color: '#fff',
                        background: '#1A3039'
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: '#fff'
                    })
            }}
        />
    )
}

