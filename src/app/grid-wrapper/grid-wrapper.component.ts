import { ChangeDetectorRef, Component, ViewChild, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { Header1Component } from '../header1/header1.component';
import { CompositeFilterDescriptor, State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.scss']
})
export class GridWrapperComponent {
  showDeleteConfirmation: boolean = false;
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
  statuses: string[] = [];
  searchTerm = '';
  skip = 0;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private questionService: QuestionService
  ) {}

  onStatusesChange(newStatuses: string[]) {
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
    const statusFilters: any[] = [];
    this.statuses.forEach(status => {
      if (status === 'Đang soạn thảo') {
        statusFilters.push({ field: 'StatusName', operator: 'eq', value: 'Đang soạn thảo' });
        statusFilters.push({ field: 'StatusName', operator: 'eq', value: 'Trả về' });
      } else {
        statusFilters.push({ field: 'StatusName', operator: 'eq', value: status });
      }
    });
    let compositeFilter: CompositeFilterDescriptor | undefined;
    if (statusFilters.length > 0 || this.searchTerm) {
      compositeFilter = { logic: 'and', filters: [] };
      if (statusFilters.length > 0) {
        compositeFilter.filters.push({
          logic: 'or',
          filters: statusFilters
        });
      }
      if (this.searchTerm) {
        compositeFilter.filters.push({
          field: 'Question',
          operator: 'contains',
          value: this.searchTerm
        });
      }
    }
    const state: State = {
      filter: compositeFilter,
      take: this.pageSize,
      skip: this.skip
    };
    this.questionService.getAllQuestions(state).subscribe((res: any) => {
      if (res && res.ObjectReturn && res.ObjectReturn.Data) {
        this.gridView = {
          data: res.ObjectReturn.Data,
          total: res.ObjectReturn.Total || 0
        };
      } else {
        this.gridView = { data: [], total: 0 };
      }
      this.cdr.detectChanges();
    });
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
    this.allSelected = this.gridView.data.length > 0 &&
      this.selectedItems.length === this.gridView.data.length;
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

  getActions(status: string): string[] {
    if (status === 'Đang soạn thảo') return ['Chỉnh sửa', 'Gởi duyệt', 'Xóa câu hỏi'];
    if (status === 'Gởi duyệt') return ['Chỉnh sửa', 'Phê duyệt', 'Trả về'];
    if (status === 'Duyệt áp dụng') return ['Xem chi tiết', 'Ngưng hiển thị'];
    if (status === 'Ngưng áp dụng') return ['Xem chi tiết', 'Phê duyệt', 'Trả về'];
    if (status === 'Trả về') return ['Xem chi tiết', 'Gởi duyệt'];
    return [];
  }

  onActionClick(action: string, dataItem: any) {
    this.openedRowIndex = null;
    let newStatus = '';
    if (action === 'Chỉnh sửa') {
      this.router.navigate(['/edit', dataItem.QuestionID]);
      return;
    } else if (action === 'Gởi duyệt') {
      newStatus = 'Gởi duyệt';
    } else if (action === 'Xóa câu hỏi') {
      this.itemToDelete = dataItem;
      this.showDeleteConfirmation = true;
      return;
    } else if (action === 'Phê duyệt') {
      newStatus = 'Duyệt áp dụng';
    } else if (action === 'Trả về') {
      newStatus = 'Trả về';
    } else if (action === 'Xem chi tiết') {
      this.router.navigate(['/detail', dataItem.QuestionID]);
      return;
    } else if (action === 'Ngưng hiển thị' || action === 'Ngưng áp dụng') {
      newStatus = 'Ngưng áp dụng';
    }
    if (newStatus) {
      this.questionService.updateStatus([dataItem], newStatus).subscribe(() => {
        dataItem.StatusName = newStatus;
        this.loadData();
        this.cdr.detectChanges();
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

  getStatusColor(status: string): string {
    switch (status) {
      case 'Đang soạn thảo': return '#23282c';
      case 'Trả về': return '#ffb900';
      case 'Gởi duyệt': return '#008cd7';
      case 'Duyệt áp dụng': return '#316e00';
      case 'Ngưng áp dụng': return '#eb273a';
      default: return 'transparent';
    }
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
