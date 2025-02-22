import { Component } from '@angular/core';
import { PanelBarExpandMode } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public expandMode: PanelBarExpandMode = PanelBarExpandMode.Single;
  public activeParent: string | null = null; 
  public selectedChild: string | null = null; 

  onChildClick(event: Event, parentTitle: string, childTitle: string) {
    event.stopPropagation();
    this.selectedChild = `${parentTitle} > ${childTitle}`;
    this.activeParent = parentTitle;
  }

  onParentClick(parentTitle: string) {
    if (this.activeParent === parentTitle) {
      this.activeParent = null;
    } else {
      this.activeParent = parentTitle;
    }
  }

  isParentActive(parentTitle: string): boolean {
    return this.activeParent === parentTitle;
  }

  isChildSelected(parentTitle: string, childTitle: string): boolean {
    return this.selectedChild === `${parentTitle} > ${childTitle}`; 
  }
}
