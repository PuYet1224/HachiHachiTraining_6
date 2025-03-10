import { Component, ChangeDetectorRef, Output, EventEmitter, OnInit } from '@angular/core';
import { QuestionStatus } from '../enums/question-status.enum.ts';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.scss']
})
export class Header1Component implements OnInit {
  @Output() filterStatuses = new EventEmitter<QuestionStatus[]>();
  public QuestionStatus = QuestionStatus;
  statuses: QuestionStatus[] = [QuestionStatus.DANG_SOAN_THAO];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.filterStatuses.emit(this.statuses);
  }

  isSelected(status: QuestionStatus): boolean {
    return this.statuses.includes(status);
  }

  toggleImmediate(status: QuestionStatus, event: MouseEvent) {
    event.preventDefault();
    this.toggle(status);
    this.filterStatuses.emit(this.statuses);
    this.cdr.detectChanges();
  }

  toggle(status: QuestionStatus) {
    if (this.isSelected(status)) {
      this.statuses = this.statuses.filter(s => s !== status);
    } else {
      this.statuses.push(status);
    }
  }

  reset() {
    this.statuses = [QuestionStatus.DANG_SOAN_THAO];
    this.filterStatuses.emit(this.statuses);
    this.cdr.detectChanges();
  }
}
