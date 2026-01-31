export interface Producto {
  id: number;
  sku: string;

  categoria_id: number;
  subcategoria_id: number;
  familia_id: number;
  via_administracion_id: number;

  marca: string | null;
  nombre: string;
  unidades_por_envase: number;
  comentarios: string | null;
  foto_url: string | null;

  principio_activo: string | null;
  concentracion: string | null;
  forma_farmaceutica: string | null;

  sustancia_controlada: boolean;
  requiere_serializacion: boolean;

  pvp: string | null;
  stock: number;
}
