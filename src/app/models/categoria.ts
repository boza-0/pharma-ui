import { Familia } from './familia';

export interface Subcategoria {
  id: number;
  nombre: string;
  abbreviation: string;
  familias: Familia[];
}

export interface Categoria {
  id: number;
  nombre: string;
  abbreviation: string;
  subcategorias?: Subcategoria[];
}
