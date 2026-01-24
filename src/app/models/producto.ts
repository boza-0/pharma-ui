export interface Producto {
  id: number;
  sku: string;

  categoria: string;
  subcategoria: string;
  familia: string;
  via_administracion: string;

  marca: string;
  nombre: string;
  pvp: string;
  stock: number;

  principio_activo: string;
  concentracion: string;
  forma_farmaceutica: string;
}
