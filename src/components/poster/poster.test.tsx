import { render, screen } from '@testing-library/react';
import { Poster } from './poster';

const POSTER_WIDTH = 200;
const POSTER_HEIGHT = 300;

describe('Functionality Check for Poster Component', () => {
  it('verifies the rendering of poster image with correct source and alternate text', () => {
    render(
      <Poster src="poster-image.jpg" alt="Movie Poster" />
    );

    const posterImg = screen.getByAltText('Movie Poster');
    expect(posterImg).toBeInTheDocument();
    expect(posterImg).toHaveAttribute('src', 'poster-image.jpg');
  });

  it('confirms the application of custom dimensions to the poster image', () => {
    render(
      <Poster src="poster-image.jpg" alt="Movie Poster" width={POSTER_WIDTH} height={POSTER_HEIGHT} />
    );

    const posterImg = screen.getByAltText('Movie Poster');
    expect(posterImg).toHaveAttribute('width', POSTER_WIDTH.toString());
    expect(posterImg).toHaveAttribute('height', POSTER_HEIGHT.toString());
  });
});
