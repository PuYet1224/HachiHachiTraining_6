import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-multi-popup',
  templateUrl: './multi-popup.component.html',
  styleUrls: ['./multi-popup.component.scss']
})
export class MultiPopupComponent implements OnChanges {
  @Input() selectedItems: any[] = [];
  allowedActions: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItems']) {
      this.allowedActions = [];
      this.selectedItems.forEach(item => {
        this.getActionsForStatus(item.status).forEach(a => {
          if (!this.allowedActions.includes(a)) this.allowedActions.push(a);
        });
      });
    }
  }

  getActionsForStatus(status: string): string[] {
    if (status === 'Đang soạn thảo') return ['Gửi duyệt','Xóa'];
    if (status === 'Gửi duyệt') return ['Phê duyệt','Trả về'];
    if (status === 'Duyệt áp dụng') return ['Ngừng áp dụng'];
    if (status === 'Ngừng áp dụng') return ['Phê duyệt','Trả về'];
    if (status === 'Trả về') return ['Gửi duyệt'];
    return [];
  }

  sendForApproval() {
    this.selectedItems.forEach(item => {
      if (item.status === 'Đang soạn thảo' || item.status === 'Trả về') item.status = 'Gửi duyệt';
    });
    this.closePopup();
  }

  approve() {
    this.selectedItems.forEach(item => {
      if (item.status === 'Gửi duyệt' || item.status === 'Ngừng áp dụng') item.status = 'Duyệt áp dụng';
    });
    this.closePopup();
  }

  returnItem() {
    this.selectedItems.forEach(item => {
      if (item.status === 'Gửi duyệt' || item.status === 'Ngừng áp dụng') item.status = 'Trả về';
    });
    this.closePopup();
  }

  stopApply() {
    this.selectedItems.forEach(item => {
      if (item.status === 'Duyệt áp dụng') item.status = 'Ngừng áp dụng';
    });
    this.closePopup();
  }

  deleteItem() {
    this.selectedItems.forEach(item => item.toDelete = true);
    this.closePopup();
  }

  closePopup() {
    this.selectedItems.forEach(item => item.selected = false);
    this.selectedItems.length = 0;
    this.allowedActions = [];
  }
}
