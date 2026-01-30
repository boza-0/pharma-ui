import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCategorias() {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`);
  }

  getCategoria(id: number) {
    return this.http.get<Categoria>(`${this.baseUrl}/categorias/${id}`);
  }
}
