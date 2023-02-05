import { Grid } from '@mui/material';
import { useState } from 'react';
import FileUpload from '../FileUpload';
import RangeSlider from '../RangeSlider';
import { sx } from './styles';
import { SettingsActionKind, SettingsState } from './types';
import { settingReducer } from './utils';

export interface SettingsModalProps {
  onDataChange: Function;
  onSliderChange: Function;
}

export const INITIAL_STATE = {
  coverage: 0,
  floorNumber: 0,
  floorHeight: 0,
};

const SettingsModal = (props: SettingsModalProps) => {
  const { onDataChange, onSliderChange } = props;

  const [, dispatch] = useState<SettingsState>(INITIAL_STATE);

  const handleSliderRangeChange = (type: SettingsActionKind) => (value: number) => {
    // Call the dispatch function and pass it a callback that returns the new state
    dispatch((oldState) => {
      // Use the settingReducer function to update the state based on the type
      const newState = settingReducer(oldState, { type, value });
      // Call the onSliderChange function and pass it the new state and type
      onSliderChange(newState, type);

      return newState;
    });
  };

  return (
    <Grid>
      <Grid container sx={sx.modal}>
        <FileUpload title="Load GeoJson" onDataChange={onDataChange} />
        <RangeSlider
          min={0}
          max={100}
          title="lot converage %"
          onChange={handleSliderRangeChange(SettingsActionKind.STATE_COVERAGE)}
        />
        <RangeSlider
          min={0}
          max={100}
          title="floor number"
          onChange={handleSliderRangeChange(SettingsActionKind.STATE_FLOOR_NUMBER)}
        />
        <RangeSlider
          min={0}
          max={100}
          title="floor height"
          onChange={handleSliderRangeChange(SettingsActionKind.STATE_FLOOR_HEIGHT)}
        />
      </Grid>
    </Grid>
  );
};

export default SettingsModal;
