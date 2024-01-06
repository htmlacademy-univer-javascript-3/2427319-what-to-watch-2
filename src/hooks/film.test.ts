import { useFilmRatingLabel } from './films';

describe('useFilmRatingLabel', () => {
  it('should return "Awesome" for a rating of 10 or greater', () => {
    expect(useFilmRatingLabel(10)).toBe('Awesome');
    expect(useFilmRatingLabel(11)).toBe('Awesome');
  });

  it('should return "Very good" for a rating between 8 and 10', () => {
    expect(useFilmRatingLabel(8.1)).toBe('Very good');
    expect(useFilmRatingLabel(9.9)).toBe('Very good');
  });

  it('should return "Good" for a rating between 5 and 8', () => {
    expect(useFilmRatingLabel(5)).toBe('Good');
    expect(useFilmRatingLabel(7.9)).toBe('Good');
  });

  it('should return "Normal" for a rating between 3 and 5', () => {
    expect(useFilmRatingLabel(3.1)).toBe('Normal');
    expect(useFilmRatingLabel(4.9)).toBe('Normal');
  });

  it('should return "Bad" for a rating less than 3', () => {
    expect(useFilmRatingLabel(2.9)).toBe('Bad');
    expect(useFilmRatingLabel(0)).toBe('Bad');
  });
});

