import { render, screen, waitFor } from '@testing-library/react';
import { VideoPlayer } from './videoplayer';

const testProps = {
  src: 'test-video.mp4',
  poster: 'test-poster.jpg',
};

describe('Assessment of VideoPlayer Component Features', () => {
  it('ensures video player is loaded with specified properties', () => {
    render(<VideoPlayer {...testProps} />);

    const videoElement = screen.getByTestId('video-player');

    expect(videoElement).toBeInTheDocument();
    expect(videoElement.tagName).toBe('VIDEO');
    expect(videoElement).toHaveAttribute('src', testProps.src);
    expect(videoElement).toHaveAttribute('poster', testProps.poster);
    expect(videoElement).toHaveClass('player__video');
    expect(videoElement).toHaveAttribute('loop');
  });

  it('validates video play functionality after set delay', async () => {
    render(<VideoPlayer {...testProps} />);

    const videoElement: HTMLVideoElement = screen.getByTestId('video-player');
    expect(videoElement.paused).toBe(true);

    await waitFor(() => {
      setTimeout(() => {
        expect(videoElement.paused).toBe(false);
      }, 1000);
    });
  });
});
