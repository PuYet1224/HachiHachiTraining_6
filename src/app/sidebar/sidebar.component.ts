import { Component, OnInit } from '@angular/core';
import { PanelBarExpandMode } from '@progress/kendo-angular-layout';
import { MenuStateService } from '../services/menu-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public expandMode: PanelBarExpandMode = PanelBarExpandMode.Single;
  public activeParent: string | null = null;
  public selectedChild: string | null = null;
  public isMenuOpen: boolean = true;
  public currentMode: string = 'CẤU HÌNH';

  constructor(private menuStateService: MenuStateService, private router: Router) {}

  ngOnInit(): void {
    this.menuStateService.mode$.subscribe(mode => {
      this.currentMode = mode;
    });
    this.menuStateService.selectedMenu$.subscribe(selectedMenu => {
      if (selectedMenu) {
        this.selectedChild = selectedMenu;
        const parts = selectedMenu.split(' > ');
        if (parts.length === 2) {
          this.activeParent = parts[0];
        }
      } else {
        this.activeParent = null;
        this.selectedChild = null;
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onChildClick(event: Event, parentTitle: string, childTitle: string): void {
    event.stopPropagation();
    this.selectedChild = `${parentTitle} > ${childTitle}`;
    this.activeParent = parentTitle;
    this.menuStateService.selectMenu(this.selectedChild);
    if (parentTitle === 'Quản trị hệ thống' && childTitle === 'Phân quyền') {
      this.menuStateService.setMode('PHÂN QUYỀN');
      this.router.navigate(['/phan-quyen-tree']);
    } else if (parentTitle === 'Hồ sơ nhân sự' && childTitle === 'Thông tin cá nhân') {
      this.menuStateService.setMode('CẤU HÌNH');
      this.router.navigate(['/']);
    }
  }

  onParentClick(event: Event, parentTitle: string): void {
    event.stopPropagation();
    if (this.activeParent !== parentTitle) {
      this.activeParent = parentTitle;
    }
  }

  isParentActive(parentTitle: string): boolean {
    return this.selectedChild?.startsWith(parentTitle) || false;
  }

  isChildSelected(parentTitle: string, childTitle: string): boolean {
    return this.selectedChild === `${parentTitle} > ${childTitle}`;
  }
}
