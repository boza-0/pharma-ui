export interface Producto {
  id: number;
  sku: string;

  categoria_id: number;
  categoria_nombre: string;

  subcategoria_id: number;
  subcategoria_nombre: string;

  familia_id: number;
  familia_nombre: string;

  via_administracion_id: number;
  via_administracion_nombre: string;

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
