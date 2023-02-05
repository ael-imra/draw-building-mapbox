import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatisticsModal from '../';

afterEach(cleanup);
describe('StatisticsModal', () => {
  const props = {
    landArea: 1000,
    buildingArea: 2000,
    buildingFloorArea: 3000,
    volume: 4000,
    buildingHeight: 5000,
  };

  it('should render correctly', () => {
    const { asFragment } = render(<StatisticsModal {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the correct values', () => {
    render(<StatisticsModal {...props} />);

    const items = screen.queryAllByTestId('statisticsItem');

    expect(items.length).toEqual(5);

    expect(items[0]).toHaveTextContent('Land Area 1000');
    expect(items[1]).toHaveTextContent('Building Area 2000');
    expect(items[2]).toHaveTextContent('Building Floor Area 3000');
    expect(items[3]).toHaveTextContent('Volume 4000');
    expect(items[4]).toHaveTextContent('Building Height 5000');
  });
});
