import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { Categoria } from '../../models/categoria';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent {
  categorias$: Observable<Categoria[]>;

  constructor(private api: ApiService) {
    this.categorias$ = this.api.getCategorias();
  }
}
