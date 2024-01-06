import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import ScrollToTop from './scroll-to-top';

describe('Evaluation of ScrollToTop Component Behavior', () => {
  it('ensures automatic scrolling to top on route change', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/home']}>
        <ScrollToTop />
      </MemoryRouter>
    );

    act(() => {
      global.history.pushState({}, 'About Page', '/about');
    });

    expect(window.scrollY).toBe(0);

    unmount();
  });
});
