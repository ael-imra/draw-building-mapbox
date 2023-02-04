import { Grid } from '@mui/material';
import SettingsModal from '../SettingsModal';

const App = () => {
  return (
    <Grid>
      <SettingsModal onDataChange={console.log} onSliderChange={console.log} />
    </Grid>
  );
};

export default App;
