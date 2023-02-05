import { Grid } from '@mui/material';
import { sx } from './style';

interface StatisticsModalProps {
  landArea: number;
  buildingArea: number;
  buildingFloorArea: number;
  volume: number;
  buildingHeight: number;
}

const StatisticsModal = (props: StatisticsModalProps) => {
  const { landArea, buildingArea, buildingFloorArea, volume, buildingHeight } = props;

  return (
    <Grid container sx={sx.statiscticsModal}>
      <Grid sx={sx.statiscticsTitle}>Statistics</Grid>
      <Grid data-testid="statisticsItem" container sx={sx.statisticsItem}>
        Land Area <span>{landArea}</span>
      </Grid>
      <Grid data-testid="statisticsItem" container sx={sx.statisticsItem}>
        Building Area <span>{buildingArea}</span>
      </Grid>
      <Grid data-testid="statisticsItem" container sx={sx.statisticsItem}>
        Building Floor Area <span>{buildingFloorArea}</span>
      </Grid>
      <Grid data-testid="statisticsItem" container sx={sx.statisticsItem}>
        Volume <span>{volume}</span>
      </Grid>
      <Grid data-testid="statisticsItem" container sx={sx.statisticsItem}>
        Building Height <span>{buildingHeight}</span>
      </Grid>
    </Grid>
  );
};

export default StatisticsModal;
