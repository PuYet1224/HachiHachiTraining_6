import { ChangeDetectorRef, Component, ViewChild, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { Header1Component } from '../header1/header1.component';
import { CompositeFilterDescriptor, State } from '@progress/kendo-data-query';
import { QuestionStatus } from '../enums/question-status.enum.ts';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.scss']
})
export class GridWrapperComponent {
  isLoading = false;
  showDeleteConfirmation = false;
  itemToDelete: any = null;
  @ViewChild('header1') header1Component!: Header1Component;
  @ViewChild('popupContainer', { static: true }) popupContainer!: ElementRef;
  gridView: GridDataResult = { data: [], total: 0 };
  pageSize = 25;
  pageSizes = [25, 50, 75, 100];
  allSelected = false;
  selectedItems: any[] = [];
  openedRowIndex: number | null = null;
  popupAnchor: any;
  statuses: QuestionStatus[] = [];
  searchTerm = '';
  skip = 0;

  private actionsMapping: { [key in QuestionStatus]: string[] } = {
    [QuestionStatus.DANG_SOAN_THAO]: ['Chỉnh sửa', 'Gởi duyệt', 'Xóa câu hỏi'],
    [QuestionStatus.GOI_DUYET]: ['Chỉnh sửa', 'Phê duyệt', 'Trả về'],
    [QuestionStatus.DUYET_AP_DUNG]: ['Xem chi tiết', 'Ngưng hiển thị'],
    [QuestionStatus.NGUNG_AP_DUNG]: ['Xem chi tiết', 'Phê duyệt', 'Trả về'],
    [QuestionStatus.TRA_VE]: ['Xem chi tiết', 'Gởi duyệt']
  };

  private colorMapping: { [key in QuestionStatus]: string } = {
    [QuestionStatus.DANG_SOAN_THAO]: '#23282c',
    [QuestionStatus.GOI_DUYET]: '#008cd7',
    [QuestionStatus.DUYET_AP_DUNG]: '#316e00',
    [QuestionStatus.NGUNG_AP_DUNG]: '#eb273a',
    [QuestionStatus.TRA_VE]: '#ffb900'
  };

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private questionService: QuestionService,
    private notificationService: NotificationService
  ) {}

  onStatusesChange(newStatuses: QuestionStatus[]) {
    this.statuses = newStatuses;
    this.skip = 0;
    this.loadData();
  }

  onSearchChange(newTerm: string) {
    this.searchTerm = newTerm;
    this.skip = 0;
    this.loadData();
  }

  onResetFilters() {
    if (this.header1Component) {
      this.header1Component.reset();
    }
    this.searchTerm = '';
    this.skip = 0;
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    const statusFilters: any[] = [];
    this.statuses.forEach(status => {
      if (status === QuestionStatus.DANG_SOAN_THAO) {
        statusFilters.push({ field: 'StatusID', operator: 'eq', value: QuestionStatus.DANG_SOAN_THAO });
        statusFilters.push({ field: 'StatusID', operator: 'eq', value: QuestionStatus.TRA_VE });
      } else {
        statusFilters.push({ field: 'StatusID', operator: 'eq', value: status });
      }
    });
    let compositeFilter: CompositeFilterDescriptor | undefined;
    if (statusFilters.length > 0 || this.searchTerm) {
      compositeFilter = { logic: 'and', filters: [] };
      if (statusFilters.length > 0) {
        compositeFilter.filters.push({ logic: 'or', filters: statusFilters });
      }
      if (this.searchTerm) {
        compositeFilter.filters.push({ field: 'Question', operator: 'contains', value: this.searchTerm });
      }
    }
    const state: State = { filter: compositeFilter, take: this.pageSize, skip: this.skip };
    this.questionService.getAllQuestions(state).subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res && res.ObjectReturn) {
          this.gridView = {
            data: res.ObjectReturn.Data || [],
            total: res.ObjectReturn.Total || 0
          };
        } else {
          this.gridView = { data: [], total: 0 };
        }
        this.cdr.detectChanges();
      },
      (error) => {
        this.isLoading = false;
        this.notificationService.show({
          content: 'Lỗi khi tải dữ liệu. Vui lòng thử lại.',
          position: { horizontal: 'left', vertical: 'bottom' },
          type: { style: 'error', icon: true },
          hideAfter: 3000
        });
      }
    );
  }

  pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadData();
  }

  toggleMenu(rowIndex: number, button: HTMLElement) {
    this.openedRowIndex = this.openedRowIndex === rowIndex ? null : rowIndex;
    this.popupAnchor = button;
    this.cdr.detectChanges();
  }

  onItemSelectChange(item: any) {
    if (item.selected && !this.selectedItems.includes(item)) {
      this.selectedItems = [...this.selectedItems, item];
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
    this.allSelected = this.gridView.data.length > 0 && this.selectedItems.length === this.gridView.data.length;
    this.cdr.detectChanges();
  }

  toggleAll() {
    this.allSelected = !this.allSelected;
    this.gridView.data.forEach((item: any) => item.selected = this.allSelected);
    this.selectedItems = this.allSelected ? [...this.gridView.data] : [];
    this.cdr.detectChanges();
  }

  onPopupClose() {
    this.selectedItems = [];
    this.allSelected = false;
    this.gridView.data.forEach((item: any) => item.selected = false);
    this.cdr.detectChanges();
  }

  onStatusChanged() {
    this.selectedItems = [];
    this.allSelected = false;
    this.loadData();
  }

  getActions(status: string | QuestionStatus): string[] {
    let statusEnum: QuestionStatus;
    if (typeof status === 'string') {
      statusEnum = QuestionStatus[status as keyof typeof QuestionStatus];
    } else {
      statusEnum = status;
    }
    return this.actionsMapping[statusEnum] || [];
  }

  onActionClick(action: string, dataItem: any) {
    this.openedRowIndex = null;
    let newStatus: QuestionStatus | null = null;
    if (action === 'Chỉnh sửa') {
      this.router.navigate(['/edit', dataItem.QuestionID]);
      return;
    } else if (action === 'Gởi duyệt') {
      newStatus = QuestionStatus.GOI_DUYET;
    } else if (action === 'Xóa câu hỏi') {
      this.itemToDelete = dataItem;
      this.showDeleteConfirmation = true;
      return;
    } else if (action === 'Phê duyệt') {
      newStatus = QuestionStatus.DUYET_AP_DUNG;
    } else if (action === 'Trả về') {
      newStatus = QuestionStatus.TRA_VE;
    } else if (action === 'Xem chi tiết') {
      this.router.navigate(['/detail', dataItem.QuestionID]);
      return;
    } else if (action === 'Ngưng hiển thị' || action === 'Ngưng áp dụng') {
      newStatus = QuestionStatus.NGUNG_AP_DUNG;
    }
    if (newStatus !== null) {
      this.questionService.updateStatus([dataItem], QuestionStatus[newStatus!]).subscribe((res: any) => {
        if (res && res.StatusCode === 3) {
          this.notificationService.show({
            content: res.ErrorString,
            position: { horizontal: 'center', vertical: 'top' },
            type: { style: 'error', icon: true },
            hideAfter: 3000
          });
        } else {
          dataItem.StatusName = QuestionStatus[newStatus!];
          this.loadData();
          this.cdr.detectChanges();
        }
      });
    }
  }

  confirmDelete() {
    if (this.itemToDelete) {
      this.questionService.deleteQuestions([this.itemToDelete]).subscribe(() => {
        this.loadData();
        this.cancelDelete();
      });
    }
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
    this.itemToDelete = null;
    this.cdr.detectChanges();
  }

  getStatusColor(status: string | QuestionStatus): string {
    let statusEnum: QuestionStatus;
    if (typeof status === 'string') {
      statusEnum = QuestionStatus[status as keyof typeof QuestionStatus];
    } else {
      statusEnum = status;
    }
    return this.colorMapping[statusEnum] || 'transparent';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (this.openedRowIndex !== null) {
      const clickedInsidePopup = this.popupContainer.nativeElement.contains(targetElement);
      const clickedOnAnchor = this.popupAnchor ? this.popupAnchor.contains(targetElement) : false;
      if (!clickedInsidePopup && !clickedOnAnchor) {
        this.openedRowIndex = null;
        this.cdr.detectChanges();
      }
    }
  }

  truncateText(text: string, limit: number): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}
