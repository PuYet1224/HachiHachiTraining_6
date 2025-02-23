import { Component, ViewEncapsulation } from '@angular/core';
import { MenuStateService } from '../services/menu-state.service';
import { BadgePosition } from '@progress/kendo-angular-indicators';

@Component({
  selector: 'app-headerwide',
  templateUrl: './headerwide.component.html',
  styleUrls: ['./headerwide.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderWideComponent {
  public badgePosition: BadgePosition = <BadgePosition>'topEnd';
  public currentMode: string = 'CẤU HÌNH';
  constructor(private menuStateService: MenuStateService) {
    this.menuStateService.mode$.subscribe(mode => {
      this.currentMode = mode;
    });
  }
  selectMode(mode: string) {
    this.menuStateService.setMode(mode);
  }
}
