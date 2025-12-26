import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MovieDetails} from '../../shared/models/MovieDetails';
import {MovieCardDTO} from '../../shared/models/MovieCardDTO';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  Url="http://localhost:8080/api/movies"

  public constructor(private http: HttpClient) {
  }

  public getMovieById(id:string){
    return this.http.get<MovieDetails>(this.Url+"/"+id)
  }

  public getPopularMovies(){
    return this.http.get<MovieCardDTO[]>(this.Url+"/popular");
  }

  public getTopRatedMovies(){
    return this.http.get<MovieCardDTO[]>(this.Url+"/top");
  }

  public getUpcomingMovies(){
    return this.http.get<MovieCardDTO[]>(this.Url+"/upcoming");
  }

  public getMovieByQuery(query:string){
    return this.http.get<MovieCardDTO[]>(this.Url+"/search?query="+query);
  }

}
