import { Movie } from '../../models/movie.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class MovieService {

  constructor(private http: HttpClient) {
  }

  private apiBaseUrl: string = 'http://localhost:8090';

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiBaseUrl}/movie/getAll`);
  }

  save(movie: Movie): Observable<any> {
    return this.http.post<Movie>(`${this.apiBaseUrl}/movie`, movie, {responseType:'text' as 'json'});
  }

  delete(movieId: string): Observable<any> {
    return this.http.delete<Movie>(`${this.apiBaseUrl}/movie/${movieId}`);
  }
}