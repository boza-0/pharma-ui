import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { Producto } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCategorias() {
    return this.http.get<Categoria[]>(`${this.baseUrl}/catalog/categorias`);
  }

  getCategoria(id: number) {
    return this.http.get<Categoria>(`${this.baseUrl}/catalog/categorias/${id}`);
  }

  getProductosByFamilia(familiaId: number) {
    return this.http.get<Producto[]>(
      `${this.baseUrl}/productos?familiaId=${familiaId}`
    );
  }
}
