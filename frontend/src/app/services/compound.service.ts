import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compound } from '../models/compound.model';

interface CompoundsResponse {
  compounds: Compound[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CompoundService {
  private apiUrl = 'http://localhost:3000/compounds';

  constructor(private http: HttpClient) {}

  getCompounds(page: number, limit: number): Observable<{ compounds: Compound[], total: number }> {
    return this.http.get<CompoundsResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getCompoundById(id: string): Observable<Compound> {
    return this.http.get<Compound>(`${this.apiUrl}/${id}`);
  }

  createCompound(compound: Partial<Compound>): Observable<Compound> {
    return this.http.post<Compound>(this.apiUrl, compound);
  }

  updateCompound(id: string, compound: Partial<Compound>): Observable<Compound> {
    return this.http.put<Compound>(`${this.apiUrl}/${id}`, compound);
  }

  deleteCompound(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}