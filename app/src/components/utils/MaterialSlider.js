import React from 'react';
import Slider from '@mui/material/Slider';
import { styled, createTheme, ThemeProvider } from '@mui/system';

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

const StyledSlider = styled(Slider) (({ theme }) => ({
  '& .MuiSlider-markLabel': {
    color: 'white'
  },
  '.MuiSlider-valueLabel': {
    fontSize: '12px',
    backgroundColor: '#1875D1'
  }
}))

const valuetext = (value) => {
  return `${value}`;
}

const MaterialSlider = ({ min, max, value, onChange, disabled }) => {
  return (
      <StyledSlider
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
