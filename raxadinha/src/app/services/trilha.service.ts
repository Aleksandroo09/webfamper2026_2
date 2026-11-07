import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Trilha } from '../models/trilha.model';

@Injectable({
  providedIn: 'root'
})
export class TrilhaService {
  private http = inject(HttpClient);
   private apiUrl = "https://ecotrail-4f88e-default-rtdb.firebaseio.com/trilhas";
  private sufix = ".json";

  // 1. Buscar todas as trilhas (GET)
  getAll(): Observable<Trilha[]> {
    return this.http
      .get<Record<string, Trilha> | null>(this.apiUrl + this.sufix)
      .pipe(
        map((response) => {
          if (!response) return [];
          return Object.keys(response).map((key) => ({
            ...response[key],
            id: key as any
          }));
        })
      );
  }

  // 2. Buscar por ID (GET)
  getById(id: string): Observable<Trilha> {
    return this.http.get<Trilha>(`${this.apiUrl}/${id}${this.sufix}`).pipe(
      map((response) => ({
        ...response,
        id: id as any
      }))
    );
  }

  // 3. Criar nova trilha (POST)
  create(trilha: Omit<Trilha, 'id'>): Observable<Trilha> {
    return this.http
      .post<{ name: string }>(this.apiUrl + this.sufix, trilha)
      .pipe(
        map((response) => ({
          id: response.name as any,
          ...trilha
        }))
      );
  }

  // 4. Deletar trilha por ID (DELETE)
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
  }
}