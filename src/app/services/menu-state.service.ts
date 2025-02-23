import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuStateService {
  private selectedMenuSubject = new BehaviorSubject<string | null>('Hồ sơ nhân sự > Thông tin cá nhân');
  selectedMenu$ = this.selectedMenuSubject.asObservable();

  private modeSubject = new BehaviorSubject<string>('CẤU HÌNH');
  mode$ = this.modeSubject.asObservable();

  selectMenu(menu: string | null) {
    this.selectedMenuSubject.next(menu);
  }

  setMode(mode: string) {
    this.modeSubject.next(mode);
  }
}
