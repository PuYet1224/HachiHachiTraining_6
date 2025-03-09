import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MenuStateService {
  private selectedMenuSubject = new BehaviorSubject<string | null>(null);
  selectedMenu$ = this.selectedMenuSubject.asObservable();

  private modeSubject = new BehaviorSubject<string>('CẤU HÌNH');
  mode$ = this.modeSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.includes('/phan-quyen-tree')) {
        this.modeSubject.next('PHÂN QUYỀN');
        this.selectedMenuSubject.next('Quản trị hệ thống > Phân quyền');
      } else {
        this.modeSubject.next('CẤU HÌNH');
        this.selectedMenuSubject.next('Hồ sơ nhân sự > Thông tin cá nhân');
      }
    });
  }

  setMode(mode: string) {
    this.modeSubject.next(mode);
    if (mode === 'PHÂN QUYỀN') {
      this.selectedMenuSubject.next('Quản trị hệ thống > Phân quyền');
    } else {
      this.selectedMenuSubject.next('Hồ sơ nhân sự > Thông tin cá nhân');
    }
  }

  selectMenu(menu: string | null) {
    this.selectedMenuSubject.next(menu);
  }
}
