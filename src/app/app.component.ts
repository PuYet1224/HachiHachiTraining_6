import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuStateService } from './services/menu-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'HachiHachiTraining_7';
  isPersonalInfoSelected = false;
  isPhanQuyenSelected = false;
  currentMode = 'CẤU HÌNH';
  private subs = new Subscription();

  constructor(
    private menuStateService: MenuStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Kiểm tra URL khi khởi tạo
    if (this.router.url.includes('/phan-quyen-tree')) {
      this.menuStateService.setMode('PHÂN QUYỀN');
      this.menuStateService.selectMenu('Quản trị hệ thống > Phân quyền');
    } else {
      this.menuStateService.setMode('CẤU HÌNH');
      this.menuStateService.selectMenu('Hồ sơ nhân sự > Thông tin cá nhân');
    }

    this.subs.add(
      this.menuStateService.selectedMenu$.subscribe(selectedMenu => {
        this.isPersonalInfoSelected = (selectedMenu === 'Hồ sơ nhân sự > Thông tin cá nhân');
        this.isPhanQuyenSelected = (selectedMenu === 'Quản trị hệ thống > Phân quyền');
      })
    );
    this.subs.add(
      this.menuStateService.mode$.subscribe(mode => {
        this.currentMode = mode;
      })
    );
  }

  get isEditPage(): boolean {
    return this.router.url.includes('/edit-page');
  }

  onStatusesChange(newStatuses: string[]) {
    console.log('onStatusesChange:', newStatuses);
  }

  onSearchChange(newTerm: string) {
    console.log('onSearchChange:', newTerm);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
