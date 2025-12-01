import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Tab {
  current_tab=signal('dashboard')
}
