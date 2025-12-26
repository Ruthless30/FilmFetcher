import {MovieCardDTO} from './MovieCardDTO';

export interface MovieDetails extends MovieCardDTO {
  overview: string;
  vote_average: number;
  cast: string[];
}
