import { SxProps } from '@mui/material';

export const sx: { [key: string]: SxProps } = {
  modal: {
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 20,
    width: '300px',
    height: '90%',
    background: 'white',
    borderRadius: '15px',
    zIndex: 99,
    gap: '15px',
  },
};
