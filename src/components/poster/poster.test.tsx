import { render, screen } from '@testing-library/react';
import { Poster } from './poster';


const POSTER_WIDTH = 200;
const POSTER_HEIGHT = 300;

describe('Poster Component', () => {
  it('should render the poster image with the provided src and alt text', () => {
    render(
      <Poster src="poster-image.jpg" alt="Movie Poster" />
    );

    const posterImage = screen.getByAltText('Movie Poster');
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', 'poster-image.jpg');
  });

  it('should set custom width and height if provided', () => {
    render(
      <Poster src="poster-image.jpg" alt="Movie Poster" width={POSTER_WIDTH} height={POSTER_HEIGHT} />
    );

    const posterImage = screen.getByAltText('Movie Poster');
    expect(posterImage).toHaveAttribute('width', POSTER_WIDTH.toString());
    expect(posterImage).toHaveAttribute('height', POSTER_HEIGHT.toString());
  });
});
