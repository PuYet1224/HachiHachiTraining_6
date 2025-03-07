import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-multi-popup',
  templateUrl: './multi-popup.component.html',
  styleUrls: ['./multi-popup.component.scss']
})
export class MultiPopupComponent implements OnChanges {
  @Input() selectedItems: any[] = [];
  @Output() popupClosed = new EventEmitter<void>();
  @Output() statusChanged = new EventEmitter<void>();
  allowedActions: string[] = [];
  showDeleteConfirmation: boolean = false;

  constructor(private questionService: QuestionService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItems']) {
      this.allowedActions = [];
      if (this.selectedItems && this.selectedItems.length) {
        this.selectedItems.forEach(item => {
          this.getActionsForStatus(item.StatusName).forEach(action => {
            if (!this.allowedActions.includes(action)) {
              this.allowedActions.push(action);
            }
          });
        });
      }
    }
  }

  getActionsForStatus(statusName: string): string[] {
    if (statusName === 'Đang soạn thảo') return ['Gởi duyệt', 'Xóa câu hỏi'];
    if (statusName === 'Gởi duyệt') return ['Phê duyệt', 'Trả về'];
    if (statusName === 'Duyệt áp dụng') return ['Ngưng áp dụng'];
    if (statusName === 'Ngưng áp dụng') return ['Phê duyệt', 'Trả về'];
    if (statusName === 'Trả về') return ['Gởi duyệt'];
    return [];
  }

  sendForApproval() {
    const toUpdate = this.selectedItems.filter(
      x => x.StatusName === 'Đang soạn thảo' || x.StatusName === 'Trả về'
    );
    if (toUpdate.length) {
      this.questionService.updateStatus(toUpdate, 'Gởi duyệt').subscribe(() => {
        toUpdate.forEach(i => (i.StatusName = 'Gởi duyệt'));
        this.statusChanged.emit();
        this.closePopup();
      });
    } else {
      this.closePopup();
    }
  }

  approve() {
    const toUpdate = this.selectedItems.filter(
      x => x.StatusName === 'Gởi duyệt' || x.StatusName === 'Ngưng áp dụng'
    );
    if (toUpdate.length) {
      this.questionService.updateStatus(toUpdate, 'Duyệt áp dụng').subscribe(() => {
        toUpdate.forEach(i => (i.StatusName = 'Duyệt áp dụng'));
        this.statusChanged.emit();
        this.closePopup();
      });
    } else {
      this.closePopup();
    }
  }

  returnItem() {
    const toUpdate = this.selectedItems.filter(
      x => x.StatusName === 'Gởi duyệt' || x.StatusName === 'Ngưng áp dụng'
    );
    if (toUpdate.length) {
      this.questionService.updateStatus(toUpdate, 'Trả về').subscribe(() => {
        toUpdate.forEach(i => (i.StatusName = 'Trả về'));
        this.statusChanged.emit();
        this.closePopup();
      });
    } else {
      this.closePopup();
    }
  }

  stopApply() {
    const toUpdate = this.selectedItems.filter(x => x.StatusName === 'Duyệt áp dụng');
    if (toUpdate.length) {
      this.questionService.updateStatus(toUpdate, 'Ngưng áp dụng').subscribe(() => {
        toUpdate.forEach(i => (i.StatusName = 'Ngưng áp dụng'));
        this.statusChanged.emit();
        this.closePopup();
      });
    } else {
      this.closePopup();
    }
  }

  deleteItem() {
    if (this.selectedItems.length) {
      this.showDeleteConfirmation = true;
    } else {
      this.closePopup();
    }
  }

  confirmDelete() {
    this.questionService.deleteQuestions(this.selectedItems).subscribe(() => {
      this.selectedItems.forEach(i => (i.toDelete = true));
      this.statusChanged.emit();
      this.closePopup();
      this.showDeleteConfirmation = false;
    });
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  closePopup() {
    if (this.selectedItems && this.selectedItems.length) {
      this.selectedItems.forEach(i => (i.selected = false));
    }
    this.allowedActions = [];
    this.popupClosed.emit();
  }
}
