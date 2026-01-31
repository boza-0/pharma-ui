import { Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { FamiliaComponent } from './components/familia/familia.component';

export const routes: Routes = [
  { path: 'categorias', component: CategoriasComponent },
  { path: 'categorias/:id', component: CategoriaComponent },
  { path: 'familias/:categoriaId/:subcategoriaId/:familiaId', component: FamiliaComponent },
  { path: '', redirectTo: 'categorias', pathMatch: 'full' }
];
