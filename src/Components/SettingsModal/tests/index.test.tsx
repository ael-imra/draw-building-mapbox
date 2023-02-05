import { cleanup, render } from '@testing-library/react';
import SettingsModal, { SettingsModalProps } from '../';

afterEach(cleanup);
describe('SettingsModal', () => {
  let props: SettingsModalProps;

  beforeEach(() => {
    props = {
      onDataChange: jest.fn(),
      onSliderChange: jest.fn(),
    };
  });

  it('should render correctly', () => {
    const { asFragment } = render(<SettingsModal {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
