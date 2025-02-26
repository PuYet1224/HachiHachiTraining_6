import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.scss']
})
export class GridWrapperComponent implements OnInit {
  gridView: GridDataResult = { data: [], total: 0 };
  skip = 0;
  pageSize = 25;
  pageSizes = [25, 50, 75, 100];
  currentPage: number = 1;
  totalPages: number = 1;
  groupSize: number = 3;
  disabled: boolean = false;
  allSelected = false;
  selectedItems: any[] = [];
  openedRowIndex: number | null = null;
  popupAnchor: any;
  statuses: string[] = [];
  searchTerm = '';

  left_arrow = 'assets/left-chevron.png';
  right_arrow = 'assets/right-chevron.png';

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

  loadData() {
    const orParts: string[] = [];
    this.statuses.forEach(s => {
      const id = this.mapStatus(s);
      if (id !== undefined) {
        orParts.push(`StatusID~eq~${id}`);
      }
    });
    let filter = orParts.length ? '(' + orParts.join('~or~') + ')' : '';
    if (this.searchTerm) {
      const searchFilter = `(Question~contains~'${this.searchTerm}')`;
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

  mapStatus(s: string) {
    if (s === 'Đang soạn thảo') return 0;
    if (s === 'Gởi duyệt') return 1;
    if (s === 'Đã duyệt' || s === 'Duyệt áp dụng' || s === 'chờ duyệt') return 2;
    if (s === 'Ngừng áp dụng') return 4;
    return undefined;
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
    const newPageSize = Number(target.value);
    this.pageSize = newPageSize;
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
}
