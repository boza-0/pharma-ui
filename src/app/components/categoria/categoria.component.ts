import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // <-- RouterLink added
import { ApiService } from '../../api/api.service';
import { Categoria } from '../../models/categoria';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink // <-- RouterLink added so [routerLink] works in the template
  ],
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent {
  categoria$: Observable<Categoria>;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    this.categoria$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.api.getCategoria(Number(params.get('id')))
      )
    );
  }
}
