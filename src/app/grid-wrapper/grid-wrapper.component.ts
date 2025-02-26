import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.scss']
})
export class GridWrapperComponent implements OnInit {
  gridView: GridDataResult = { data: [], total: 0 };
  skip = 0;
  pageSize = 25;
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

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.pageSize = event.take;
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
    });
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
    this.checkForDeletion();
  }

  toggleAll() {
    this.allSelected = !this.allSelected;
    this.gridView.data.forEach((item: any) => (item.selected = this.allSelected));
    this.selectedItems = this.allSelected ? [...this.gridView.data] : [];
    this.cdr.detectChanges();
    this.checkForDeletion();
  }

  checkForDeletion() {
    if (this.gridView.data.some((d: any) => d.toDelete)) {
      this.gridView.data = this.gridView.data.filter((d: any) => !d.toDelete);
      this.selectedItems = [];
      this.allSelected = false;
    }
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
}
