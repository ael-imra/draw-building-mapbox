import { Grid, Slider } from '@mui/material';
import { useState } from 'react';
import { sx } from './style';

interface RangeSliderProps {
  title: string;
  min: number;
  max: number;
  onChange?: Function;
}

const RangeSlider = (props: RangeSliderProps) => {
  const { title, min, max, onChange } = props;

  const [value, setValue] = useState<number>(min);

  const handleSlideChange = (event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      if (onChange) onChange(newValue);
      setValue(newValue);
    }
  };

  return (
    <Grid container sx={sx.rangeContainer}>
      <Grid sx={sx.rangeTitle}>{title}</Grid>
      <Grid container sx={sx.sliderContainer}>
        <Slider
          sx={sx.slider}
          disableSwap
          defaultValue={min}
          min={min}
          max={max}
          marks={[
            { value: min, label: min },
            { value: max, label: max },
          ]}
          valueLabelDisplay="auto"
          onChangeCommitted={handleSlideChange}
        />
        <Grid container sx={sx.sliderValue}>
          {value}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RangeSlider;
