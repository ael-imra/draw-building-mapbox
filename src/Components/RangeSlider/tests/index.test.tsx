import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import RangeSlider from '../';

afterEach(cleanup);
describe('RangeSlider', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<RangeSlider title={'title'} min={0} max={100} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the title and slider with min and max values', () => {
    const title = 'Test Title';
    const min = 0;
    const max = 100;

    render(<RangeSlider title={title} min={min} max={max} />);

    expect(screen.getByText(title)).toBeInTheDocument();

    const slider = screen.getByRole('slider');

    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('min', `${min}`);
    expect(slider).toHaveAttribute('max', `${max}`);
  });

  it('should call onChange when the slider is changed', () => {
    const title = 'Test Title';
    const min = 0;
    const max = 100;

    let value: number | undefined;

    function handleChange(val: number) {
      value = val;
    }

    render(<RangeSlider title={title} min={min} max={max} onChange={handleChange} />);

    fireEvent.change(screen.getByRole('slider'), { target: { value: 5 } });

    expect(value).toBe(5);
  });
});
