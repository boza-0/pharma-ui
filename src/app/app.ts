import { Component } from '@angular/core';
import { CatalogComponent } from './components/catalog/catalog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CatalogComponent],
  template: `<app-catalog></app-catalog>`
})
export class AppComponent {}
