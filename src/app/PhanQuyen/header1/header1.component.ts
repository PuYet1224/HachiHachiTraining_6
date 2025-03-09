import { Component, ChangeDetectorRef, Output, EventEmitter, OnInit } from '@angular/core';
import { QuestionStatus } from '../../HoSoNhanSu/enums/question-status.enum.ts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phan-quyen-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.scss']
})
export class PhanQuyenHeader1Component implements OnInit {
  @Output() filterStatuses = new EventEmitter<QuestionStatus[]>();
  public QuestionStatus = QuestionStatus;
  statuses: QuestionStatus[] = [QuestionStatus.DANG_SOAN_THAO];

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.filterStatuses.emit(this.statuses);
  }

  onBreadcrumbClick(event: any) {
    if (event.text === 'QUẢN TRỊ HỆ THỐNG') {
      window.location.reload();
    }
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
