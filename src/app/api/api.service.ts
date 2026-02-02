import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { Familia } from '../models/familia';
import { Producto } from '../models/producto';
import { PresenceLogEntry } from '../models/presence-log-entry';

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

  getFamilia(categoriaId: number, subcategoriaId: number, familiaId: number) {
    return this.http.get<Familia>(
      `${this.baseUrl}/familias/${categoriaId}/${subcategoriaId}/${familiaId}`,
    );
  }

  getProductosByFamilia(categoriaId: number, subcategoriaId: number, familiaId: number) {
    return this.http.get<Producto[]>(
      `${this.baseUrl}/productos/${categoriaId}/${subcategoriaId}/${familiaId}`,
    );
  }

  postPresence(url: string) {
    return this.http.post(`${this.baseUrl}/presence`, { url });
  }

  getPresence(limit = 100) {
    return this.http.get<PresenceLogEntry[]>(`${this.baseUrl}/presence?limit=${limit}`);
  }
}
