import { render, cleanup } from '@testing-library/react';
import * as hooks from '../../../hooks';
import App from '../';
import { Map } from 'mapbox-gl';

afterEach(cleanup);
describe('App', () => {
  it('should render correctly', () => {
    jest.spyOn(hooks, 'useMap').mockImplementation(() => ({
      addConverage: jest.fn(),
      addFloors: jest.fn(),
      container: { current: jest.fn() },
      map: {} as Map,
      resizeFloors: jest.fn(),
      statistics: {},
    }));
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
