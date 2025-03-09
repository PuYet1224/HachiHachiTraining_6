import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { QuestionStatus } from '../enums/question-status.enum.ts';
import { NotificationService } from "@progress/kendo-angular-notification";

const enumToStringMapping: { [key in QuestionStatus]: string } = {
  [QuestionStatus.DANG_SOAN_THAO]: 'Đang soạn thảo',
  [QuestionStatus.GOI_DUYET]: 'Gởi duyệt',
  [QuestionStatus.DUYET_AP_DUNG]: 'Duyệt áp dụng',
  [QuestionStatus.NGUNG_AP_DUNG]: 'Ngưng áp dụng',
  [QuestionStatus.TRA_VE]: 'Trả về'
};

const stringToEnumMapping: { [key: string]: QuestionStatus } = {
  'Đang soạn thảo': QuestionStatus.DANG_SOAN_THAO,
  'Gởi duyệt': QuestionStatus.GOI_DUYET,
  'Duyệt áp dụng': QuestionStatus.DUYET_AP_DUNG,
  'Ngưng áp dụng': QuestionStatus.NGUNG_AP_DUNG,
  'Trả về': QuestionStatus.TRA_VE
};

const actionsMapping: { [key in QuestionStatus]: string[] } = {
  [QuestionStatus.DANG_SOAN_THAO]: ['Gởi duyệt', 'Xóa câu hỏi'],
  [QuestionStatus.GOI_DUYET]: ['Phê duyệt', 'Trả về'],
  [QuestionStatus.DUYET_AP_DUNG]: ['Ngưng áp dụng'],
  [QuestionStatus.NGUNG_AP_DUNG]: ['Phê duyệt', 'Trả về'],
  [QuestionStatus.TRA_VE]: ['Gởi duyệt']
};

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
  showDeleteConfirmation = false;

  constructor(
    private questionService: QuestionService,
    private notificationService: NotificationService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItems']) {
      this.allowedActions = [];
      if (this.selectedItems && this.selectedItems.length) {
        this.selectedItems.forEach(item => {
          const status: QuestionStatus = typeof item.StatusName === 'string'
            ? stringToEnumMapping[item.StatusName]
            : item.StatusName;
          actionsMapping[status].forEach(action => {
            if (!this.allowedActions.includes(action)) {
              this.allowedActions.push(action);
            }
          });
        });
      }
    }
  }

  sendForApproval() {
    const toUpdate = this.selectedItems.filter(x => {
      const status: QuestionStatus = typeof x.StatusName === 'string'
        ? stringToEnumMapping[x.StatusName]
        : x.StatusName;
      return status === QuestionStatus.DANG_SOAN_THAO || status === QuestionStatus.TRA_VE;
    });
    if (toUpdate.length) {
      this.questionService.updateStatus(toUpdate, enumToStringMapping[QuestionStatus.GOI_DUYET])
        .subscribe((res: any) => {
          if (res && res.StatusCode === 3) {
            this.notificationService.show({
              content: res.ErrorString,
              position: { horizontal: 'center', vertical: 'top' },
              type: { style: 'error', icon: true },
              hideAfter: 3000
            });
          } else {
            toUpdate.forEach(i => i.StatusName = enumToStringMapping[QuestionStatus.GOI_DUYET]);
            this.statusChanged.emit();
            this.closePopup();
          }
        });
    } else {
      this.closePopup();
    }
  }

  approve() {
    const toUpdate = this.selectedItems.filter(x => {
      const status: QuestionStatus = typeof x.StatusName === 'string'
        ? stringToEnumMapping[x.StatusName]
        : x.StatusName;
      return status === QuestionStatus.GOI_DUYET || status === QuestionStatus.NGUNG_AP_DUNG;
    });
    if (toUpdate.length) {
      this.questionService.updateStatus(toUpdate, enumToStringMapping[QuestionStatus.DUYET_AP_DUNG])
        .subscribe((res: any) => {
          if (res && res.StatusCode === 3) {
            this.notificationService.show({
              content: res.ErrorString,
              position: { horizontal: 'center', vertical: 'top' },
              type: { style: 'error', icon: true },
              hideAfter: 3000
            });
          } else {
            toUpdate.forEach(i => i.StatusName = enumToStringMapping[QuestionStatus.DUYET_AP_DUNG]);
            this.statusChanged.emit();
            this.closePopup();
          }
        });
    } else {
      this.closePopup();
    }
  }

  returnItem() {
    const toUpdate = this.selectedItems.filter(x => {
      const status: QuestionStatus = typeof x.StatusName === 'string'
        ? stringToEnumMapping[x.StatusName]
        : x.StatusName;
      return status === QuestionStatus.GOI_DUYET || status === QuestionStatus.NGUNG_AP_DUNG;
    });
    if (toUpdate.length) {
      this.questionService.updateStatus(toUpdate, enumToStringMapping[QuestionStatus.TRA_VE])
        .subscribe((res: any) => {
          if (res && res.StatusCode === 3) {
            this.notificationService.show({
              content: res.ErrorString,
              position: { horizontal: 'center', vertical: 'top' },
              type: { style: 'error', icon: true },
              hideAfter: 3000
            });
          } else {
            toUpdate.forEach(i => i.StatusName = enumToStringMapping[QuestionStatus.TRA_VE]);
            this.statusChanged.emit();
            this.closePopup();
          }
        });
    } else {
      this.closePopup();
    }
  }
  
  stopApply() {
    const toUpdate = this.selectedItems.filter(x => {
      const status: QuestionStatus = typeof x.StatusName === 'string'
        ? stringToEnumMapping[x.StatusName]
        : x.StatusName;
      return status === QuestionStatus.DUYET_AP_DUNG;
    });
    if (toUpdate.length) {
      this.questionService.updateStatus(toUpdate, enumToStringMapping[QuestionStatus.NGUNG_AP_DUNG])
        .subscribe((res: any) => {
          if (res && res.StatusCode === 3) {
            this.notificationService.show({
              content: res.ErrorString,
              position: { horizontal: 'center', vertical: 'top' },
              type: { style: 'error', icon: true },
              hideAfter: 3000
            });
          } else {
            toUpdate.forEach(i => i.StatusName = enumToStringMapping[QuestionStatus.NGUNG_AP_DUNG]);
            this.statusChanged.emit();
            this.closePopup();
          }
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
      this.selectedItems.forEach(i => i.toDelete = true);
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
      this.selectedItems.forEach(i => i.selected = false);
    }
    this.allowedActions = [];
    this.popupClosed.emit();
  }
}
