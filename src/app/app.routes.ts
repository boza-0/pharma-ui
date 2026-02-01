import { Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CategoriaDetailComponent } from './components/categoria-detail/categoria-detail.component';
import { FamiliaDetailComponent } from './components/familia-detail/familia-detail.component';

export const routes: Routes = [
  { path: 'categorias', component: CategoriasComponent },
  { path: 'categorias/:categoriaId', component: CategoriaDetailComponent },
  { path: 'familias/:categoriaId/:subcategoriaId/:familiaId', component: FamiliaDetailComponent},
  { path: '', redirectTo: 'categorias', pathMatch: 'full' }
];
