import { Component, ChangeDetectorRef, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.scss']
})
export class Header1Component implements OnInit {
  @Output() filterStatuses = new EventEmitter<string[]>();
  statuses: string[] = ['Đang soạn thảo'];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.filterStatuses.emit(this.statuses);
  }

  isSelected(status: string): boolean {
    return this.statuses.includes(status);
  }

  toggleImmediate(status: string, event: MouseEvent) {
    event.preventDefault();
    this.toggle(status);
    this.filterStatuses.emit(this.statuses);
    this.cdr.detectChanges();
  }

  toggle(status: string) {
    if (this.isSelected(status)) {
      this.statuses = this.statuses.filter(s => s !== status);
    } else {
      this.statuses.push(status);
    }
  }
}
