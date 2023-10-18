export interface FilmProps {
  rank: number;
  title: string;
  starRating: string;
  year: number;
  runtime: string;
  posterLarge: string;
  posterSmall: string;
  pgRating: string;
}

export interface PickedFilmsContextType {
  pickedFilms?: FilmProps[];
  // addPickedFilm?: (film: FilmProps) => void;
}
