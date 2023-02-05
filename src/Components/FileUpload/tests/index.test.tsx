import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUpload from '../';

afterEach(cleanup);
describe('FileUpload', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<FileUpload title={'title'} onDataChange={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the title', () => {
    const title = 'Choose File';

    render(<FileUpload title={title} onDataChange={() => {}} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should call onDataChange when a file is uploaded', async () => {
    const onDataChange = jest.fn();

    render(<FileUpload title="Choose File" onDataChange={onDataChange} />);
    const file = screen.getByTestId('file');
    fireEvent.change(file, { target: { files: [new File(['{}'], 'test.geojson')] } });

    await waitFor(() => {
      expect(onDataChange).toHaveBeenCalled();
    });
  });

  it('should show an error message when an invalid file is uploaded', async () => {
    const errorMessage = "Can't load this file";

    render(<FileUpload title="Choose File" onDataChange={() => {}} />);
    const file = screen.getByTestId('file');
    if (file) fireEvent.change(file, { target: { files: [new File(['test file'], 'test.geojson')] } });
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
