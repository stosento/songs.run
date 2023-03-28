import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const labels = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
  {
    value: 150,
    label: "150",
  },
  {
    value: 200,
    label: "200",
  }
];

const valuetext = (value) => {
  return `${value}`;
}

const MaterialSlider = ({ min, max, value, onChange, disabled }) => {
  return (
      <Slider
        value={value}
        onChange={onChange}
        valueLabelDisplay= {disabled ? "off" : "on"}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={min}
        max={max}
        marks={labels}
        disabled={disabled}
      />
    
  );
}

export default MaterialSlider;
