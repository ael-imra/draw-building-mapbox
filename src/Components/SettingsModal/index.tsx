import { Grid } from '@mui/material';
import { useEffect, useReducer } from 'react';
import FileUpload from '../FileUpload';
import RangeSlider from '../RangeSlider';
import { sx } from './styles';
import { SettingsActionKind } from './types';
import { settingReducer } from './utils';

interface SettingsModalProps {
  onDataChange: Function;
  onSliderChange: Function;
}

const INITIAL_STATE = {
  coverage: 0,
  floorNumber: 0,
  floorHeight: 0,
};

const SettingsModal = (props: SettingsModalProps) => {
  const { onDataChange, onSliderChange } = props;

  const [settings, dispatch] = useReducer(settingReducer, INITIAL_STATE);

  const handleSliderRangeChange = (type: SettingsActionKind) => (value: number) => {
    dispatch({ type, value });
  };

  useEffect(() => {
    if (settings !== INITIAL_STATE) onSliderChange(settings);
  }, [settings, onSliderChange]);

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
