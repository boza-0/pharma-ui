import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api/api.service';
import { PresenceLogEntry } from '../../models/presence-log-entry';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-presence-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './presence-log.component.html'
})
export class PresenceLogComponent implements OnInit, OnDestroy {
  entries: PresenceLogEntry[] = [];
  loading = true;

  private refreshSub?: Subscription;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refreshSub = timer(0, 60_000) // immediately, then every 60s
      .pipe(
        switchMap(() => this.api.getPresence(200))
      )
      .subscribe({
        next: rows => {
          this.entries = rows;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }
}
