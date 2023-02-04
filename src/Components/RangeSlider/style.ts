import { SxProps } from '@mui/material';

export const sx: { [key: string]: SxProps } = {
  rangeContainer: {
    flexFlow: 'column nowrap',
    width: '80%',
    gap: '10px',
    margin: '15px 0',
  },
  rangeTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: '#555555',
  },
  sliderContainer: {
    flexFlow: 'row nowrap',
    gap: '20px',
    alignItems: 'start',
    justifyContent: 'center',
  },
  slider: {
    color: '#c5c5c4',
  },
  sliderValue: {
    minWidth: '30px',
    minHeight: '30px',
    width: '30px',
    height: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#757575',
    color: 'white',
    borderRadius: '50%',
  },
};
