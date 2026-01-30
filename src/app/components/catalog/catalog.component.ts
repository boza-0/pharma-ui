import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api/api.service';
import { Categoria } from '../../models/categoria';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent {
  categorias$: Observable<Categoria[]>;

  constructor(private api: ApiService) {
    this.categorias$ = this.api.getCategorias();
  }
}
