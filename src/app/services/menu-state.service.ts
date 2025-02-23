import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  private selectedMenuSubject = new BehaviorSubject<string | null>(null);
  selectedMenu$ = this.selectedMenuSubject.asObservable();

  selectMenu(menu: string | null) {
    this.selectedMenuSubject.next(menu);
  }
}
