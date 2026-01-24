import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './api/api.service';
import { Categoria, Subcategoria, Familia } from './models/categoria';
import { Producto } from './models/producto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  categorias: Categoria[] = [];
  selectedCategoria: Categoria | null = null;
  selectedSubcategoria: Subcategoria | null = null;
  selectedFamilia: Familia | null = null;
  productos: Producto[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getCategorias().subscribe(c => (this.categorias = c));
  }

  selectCategoria(categoria: Categoria) {
    this.api.getCategoria(categoria.id).subscribe(c => {
      this.selectedCategoria = c;
      this.selectedSubcategoria = null;
      this.selectedFamilia = null;
      this.productos = [];
    });
  }

  selectFamilia(sub: Subcategoria, fam: Familia) {
    this.selectedSubcategoria = sub;
    this.selectedFamilia = fam;

    this.api.getProductosByFamilia(fam.id).subscribe(p => (this.productos = p));
  }
}
