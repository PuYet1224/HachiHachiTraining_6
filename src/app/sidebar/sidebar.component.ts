import { Component } from '@angular/core';
import { PanelBarExpandMode } from '@progress/kendo-angular-layout';
import { MenuStateService } from '../services/menu-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public expandMode: PanelBarExpandMode = PanelBarExpandMode.Single;
  public activeParent: string | null = null;
  public selectedChild: string | null = null;

  constructor(private menuStateService: MenuStateService) {}

  onChildClick(event: Event, parentTitle: string, childTitle: string) {
    event.stopPropagation();
    this.selectedChild = `${parentTitle} > ${childTitle}`;
    this.activeParent = parentTitle;
    this.menuStateService.selectMenu(this.selectedChild);
  }

  onParentClick(parentTitle: string) {
    if (this.activeParent === parentTitle) {
      this.activeParent = null;
      this.selectedChild = null; 
      this.menuStateService.selectMenu(null);
    } else {
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
