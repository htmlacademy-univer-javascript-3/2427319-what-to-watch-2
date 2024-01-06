import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Tabs } from './tabs';

describe('Tabs Component', () => {
  it('should render tabs correctly', () => {
    render(
      <MemoryRouter>
        <Tabs activeTab="Overview" />
      </MemoryRouter>
    );

    const overviewTab = screen.getByText('Overview');
    const detailsTab = screen.getByText('Details');
    const reviewsTab = screen.getByText('Reviews');

    expect(overviewTab).toBeInTheDocument();
    expect(detailsTab).toBeInTheDocument();
    expect(reviewsTab).toBeInTheDocument();
  });
});
