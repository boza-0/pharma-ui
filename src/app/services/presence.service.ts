import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({ providedIn: 'root' })
export class PresenceService {
  constructor(private api: ApiService) {}

  log(url: string): void {
    this.api.postPresence(url).subscribe({
      error: () => {
        // intentionally silent
      }
    });
  }
}
