import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiUrl = 'http://localhost:8080/api/favorites';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const jwtToken = localStorage.getItem('token') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
  }

  public toggleFavorite(movieId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/toggle/${movieId}`, {}, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }

  public getFavoriteIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/my-list`, { headers: this.getHeaders() });
  }


}
