import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISong} from "../isong";

@Injectable({
  providedIn: 'root'
})
export class SongService {
private readonly API_URL = 'http://127.0.0.1:8000/api/songs';

  constructor(private http: HttpClient) { }
  getSong(): Observable<ISong[]> {
    return this.http.get<ISong[]>(this.API_URL);
  }
  getSongById(id: number): Observable<ISong> {
    return this.http.get<ISong>(`${this.API_URL}/${id}`)
  }
  createSong(song: Partial<ISong>): Observable<ISong> {
    return this.http.post<ISong>(this.API_URL, song)
  }
  updateSong(song: Partial<ISong>): Observable<ISong> {
    return this.http.patch<ISong>(`${this.API_URL}/${song.id}`, song)
  }
  deleteSong(id: number): Observable<any> {
    return this.http.delete<ISong>(`${this.API_URL}/${id}`)
  }
}
