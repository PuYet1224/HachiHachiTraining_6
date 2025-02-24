import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.scss']
})
export class Header1Component {
  public statuses: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {} 
  isSelected(status: string): boolean {
    return this.statuses.includes(status);
  }

  toggleImmediate(status: string, event: MouseEvent) {
    event.preventDefault();

    this.toggle(status);

    this.cdr.detectChanges();
  }

  toggle(status: string): void {
    if (this.isSelected(status)) {
      this.statuses = this.statuses.filter(s => s !== status);
    } else {
      this.statuses.push(status);
    }
  }

  onAddNew() {
    alert('Thêm mới!');
  }
}
