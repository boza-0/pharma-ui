import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { Familia } from '../../models/familia';
import { Producto } from '../../models/producto';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-familia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './familia.component.html',
  //styleUrls: ['./familia.component.css']
})
export class FamiliaComponent {
  familia$: Observable<Familia>;
  productos$: Observable<Producto[]>;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    this.familia$ = this.route.paramMap.pipe(
      switchMap(params => {
        const categoriaId = Number(params.get('categoriaId'));
        const subcategoriaId = Number(params.get('subcategoriaId'));
        const familiaId = Number(params.get('familiaId'));

        return this.api.getFamilia(
          categoriaId,
          subcategoriaId,
          familiaId
        );
      })
    );

    this.productos$ = this.route.paramMap.pipe(
      switchMap(params => {
        const categoriaId = Number(params.get('categoriaId'));
        const subcategoriaId = Number(params.get('subcategoriaId'));
        const familiaId = Number(params.get('familiaId'));

        return this.api.getProductosByFamilia(
          categoriaId,
          subcategoriaId,
          familiaId
        );
      })
    );
  }
}
