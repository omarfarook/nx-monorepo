import { render } from '@testing-library/react';

import DesignSystems from './design-systems';

describe('DesignSystems', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DesignSystems />);
    expect(baseElement).toBeTruthy();
  });
});
