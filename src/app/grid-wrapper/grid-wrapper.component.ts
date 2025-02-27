import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Header1Component } from '../header1/header1.component';

@Component({
  selector: 'app-grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.scss']
})
export class GridWrapperComponent implements OnInit {
  @ViewChild('header1') header1Component!: Header1Component;
  gridView: GridDataResult = { data: [], total: 0 };
  skip = 0;
  pageSize = 25;
  pageSizes = [25, 50, 75, 100];
  currentPage = 1;
  totalPages = 1;
  groupSize = 3;
  disabled = false;
  allSelected = false;
  selectedItems: any[] = [];
  openedRowIndex: number | null = null;
  popupAnchor: any;
  statuses: string[] = [];
  searchTerm = '';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  onStatusesChange(newStatuses: string[]) {
    this.statuses = newStatuses;
    this.loadData();
  }

  onSearchChange(newTerm: string) {
    this.searchTerm = newTerm;
    this.loadData();
  }

  onResetFilters() {
    if (this.header1Component) {
      this.header1Component.reset();
    }
    this.searchTerm = '';
    this.loadData();
  }

  getStatusFilters(s: string): string[] {
    if (s === 'Đang soạn thảo')
      return ["StatusName~eq~'Đang soạn thảo'", "StatusName~eq~'Trả về'"];
    if (s === 'Gởi duyệt')
      return ["StatusName~eq~'Gởi duyệt'"];
    if (s === 'Duyệt áp dụng')
      return ["StatusName~eq~'Duyệt áp dụng'"];
    if (s === 'Ngưng áp dụng')
      return ["StatusName~eq~'Ngưng áp dụng'"];
    return [];
  }

  loadData() {
    const filterParts: string[] = [];
    this.statuses.forEach(s => {
      const filters = this.getStatusFilters(s);
      if (filters.length) {
        filterParts.push('(' + filters.join('~or~') + ')');
      }
    });
    let filter = filterParts.length ? '(' + filterParts.join('~or~') + ')' : '';
    if (this.searchTerm) {
      const searchFilter = `Question~contains~'${this.searchTerm}'`;
      filter = filter ? filter + '~and~' + searchFilter : searchFilter;
    }
    const body = {
      filter,
      pageSize: this.pageSize,
      skip: this.skip
    };
    this.questionService.getAllQuestions(body).subscribe((res: any) => {
      if (res && res.ObjectReturn && res.ObjectReturn.Data) {
        this.gridView = {
          data: res.ObjectReturn.Data,
          total: res.ObjectReturn.TotalRecords || 0
        };
      } else {
        this.gridView = { data: [], total: 0 };
      }
      this.calculateTotalPages();
      this.cdr.detectChanges();
    });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.gridView.total / this.pageSize);
    if (this.totalPages < 1) {
      this.totalPages = 1;
    }
    this.currentPage = Math.floor(this.skip / this.pageSize) + 1;
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
    this.gridView.data.forEach((item: any) => (item.selected = this.allSelected));
    this.selectedItems = this.allSelected ? [...this.gridView.data] : [];
    this.cdr.detectChanges();
  }

  onPopupClose() {
    this.selectedItems = [];
    this.allSelected = false;
    this.gridView.data.forEach((item: any) => (item.selected = false));
    this.cdr.detectChanges();
  }

  onStatusChanged() {
    this.selectedItems = [];
    this.allSelected = false;
    this.loadData();
  }

  onItemsPerPageChangeSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.pageSize = Number(target.value);
    this.skip = 0;
    this.loadData();
  }

  handleFirst() {
    if (this.currentPage > 1) {
      this.skip = 0;
      this.loadData();
    }
  }

  handleLast() {
    if (this.currentPage < this.totalPages) {
      this.skip = (this.totalPages - 1) * this.pageSize;
      this.loadData();
    }
  }

  handlePrev() {
    if (this.currentPage > 1) {
      this.skip = this.skip - this.pageSize;
      this.loadData();
    }
  }

  handleNext() {
    if (this.currentPage < this.totalPages) {
      this.skip = this.skip + this.pageSize;
      this.loadData();
    }
  }

  handleEllipsis(type: 'left' | 'right') {
    const groupNumber = Math.floor((this.currentPage - 1) / this.groupSize) + 1;
    const firstPageInGroup = (groupNumber - 1) * this.groupSize + 1;
    const lastPageInGroup = Math.min(firstPageInGroup + this.groupSize - 1, this.totalPages);
    let targetPage = 1;
    if (type === 'left') {
      targetPage = firstPageInGroup - 1;
      targetPage = targetPage >= 1 ? targetPage : 1;
    } else {
      targetPage = lastPageInGroup + 1;
      targetPage = targetPage <= this.totalPages ? targetPage : this.totalPages;
    }
    this.skip = (targetPage - 1) * this.pageSize;
    this.loadData();
  }

  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const groupNumber = Math.floor((this.currentPage - 1) / this.groupSize) + 1;
    const firstPageInGroup = (groupNumber - 1) * this.groupSize + 1;
    const lastPageInGroup = Math.min(firstPageInGroup + this.groupSize - 1, this.totalPages);
    if (firstPageInGroup > 1) {
      pages.push('left-ellipsis');
    }
    for (let i = firstPageInGroup; i <= lastPageInGroup; i++) {
      pages.push(i);
    }
    if (lastPageInGroup < this.totalPages) {
      pages.push('right-ellipsis');
    }
    return pages;
  }

  get pages() {
    return this.getPageNumbers();
  }

  isNumberPage(page: number | string): boolean {
    return typeof page === 'number';
  }

  isLeftEllipsis(page: number | string): boolean {
    return page === 'left-ellipsis';
  }

  isRightEllipsis(page: number | string): boolean {
    return page === 'right-ellipsis';
  }

  goToPage(page: number | string) {
    if (this.isNumberPage(page)) {
      this.skip = ((page as number) - 1) * this.pageSize;
      this.loadData();
    }
  }

  isActivePage(page: number | string): boolean {
    return this.isNumberPage(page) && this.currentPage === (page as number);
  }

  getActions(status: string): string[] {
    if (status === 'Đang soạn thảo') return ['Chỉnh sửa', 'Gởi duyệt', 'Xóa'];
    if (status === 'Gởi duyệt') return ['Chỉnh sửa', 'Phê duyệt', 'Trả về'];
    if (status === 'Duyệt áp dụng') return ['Xem chi tiết', 'Ngưng hiển thị'];
    if (status === 'Ngưng áp dụng') return ['Xem chi tiết', 'Phê duyệt', 'Trả về'];
    if (status === 'Trả về') return ['Xem chi tiết', 'Gởi duyệt'];
    return [];
  }

  onActionClick(action: string, dataItem: any) {
    this.openedRowIndex = null;
    if (action === 'Chỉnh sửa') {
      this.router.navigate(['/edit', dataItem.QuestionID]);
    } else if (action === 'Gởi duyệt') {
      this.questionService.updateStatus([dataItem], 'Gởi duyệt').subscribe(() => {
        dataItem.StatusName = 'Gởi duyệt';
        this.loadData();
      });
    } else if (action === 'Xóa') {
      this.questionService.deleteQuestions([dataItem]).subscribe(() => {
        this.loadData();
      });
    } else if (action === 'Phê duyệt') {
      this.questionService.updateStatus([dataItem], 'Duyệt áp dụng').subscribe(() => {
        dataItem.StatusName = 'Duyệt áp dụng';
        this.loadData();
      });
    } else if (action === 'Trả về') {
      this.questionService.updateStatus([dataItem], 'Trả về').subscribe(() => {
        dataItem.StatusName = 'Trả về';
        this.loadData();
      });
    } else if (action === 'Xem chi tiết') {
      this.router.navigate(['/detail', dataItem.QuestionID]);
    } else if (action === 'Ngưng hiển thị' || action === 'Ngưng áp dụng') {
      this.questionService.updateStatus([dataItem], 'Ngưng áp dụng').subscribe(() => {
        dataItem.StatusName = 'Ngưng áp dụng';
        this.loadData();
      });
    }
    this.cdr.detectChanges();
  }
}
