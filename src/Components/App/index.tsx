import { Grid } from '@mui/material';
import { useState } from 'react';
import { useMap } from '../../hooks';
import SettingsModal from '../SettingsModal';
import { SettingsActionKind, SettingsState } from '../SettingsModal/types';
import StatisticsModal from '../StatisticsModal';

const App = () => {
  const [geoJson, setGeoJson] = useState<any | null>(null);
  const { container, addFloors, resizeFloors, addConverage, statistics } = useMap(geoJson);

  const onSliderChange = (settings: SettingsState, type: SettingsActionKind) => {
    if (type === SettingsActionKind.STATE_FLOOR_NUMBER) addFloors(settings);
    if (type === SettingsActionKind.STATE_FLOOR_HEIGHT) resizeFloors(settings);
    if (type === SettingsActionKind.STATE_COVERAGE) addConverage(settings);
  };

  return (
    <>
      <Grid sx={{ width: '100%', height: '100%' }} ref={container} />
      <SettingsModal onDataChange={setGeoJson} onSliderChange={onSliderChange} />
      <StatisticsModal {...(statistics as any)} />
    </>
  );
};

export default App;
