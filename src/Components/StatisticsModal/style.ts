import { SxProps } from '@mui/material';

export const sx: { [key: string]: SxProps } = {
  statiscticsModal: {
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 20,
    width: '300px',
    height: '90%',
    background: 'white',
    borderRadius: '15px',
    zIndex: 99,
    gap: '15px',
  },
  statiscticsTitle: {
    fontSize: 40,
    fontWeight: 600,
    color: '#333333',
  },
  statisticsItem: {
    flexFlow: 'row nowrap',
    alignSelf: 'start',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    '& span': {
      fontWeight: 600,
    },
  },
};
