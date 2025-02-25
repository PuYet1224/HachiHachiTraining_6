import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.scss']
})
export class GridWrapperComponent implements OnInit {
  data: Array<{ question: string; group: string; workTime: string; status: string; selected: boolean; toDelete?: boolean }> = [];
  selectedItems: any[] = [];
  openedRowIndex: number | null = null;
  popupAnchor: any;
  allSelected = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.data = [
      { question: 'Câu hỏi 1', group: 'Nhóm A', workTime: '3 ngày', status: 'Đang soạn thảo', selected: false },
      { question: 'Câu hỏi 2', group: 'Nhóm B', workTime: '2 giờ', status: 'Gửi duyệt', selected: false },
      { question: 'Câu hỏi 3', group: 'Nhóm C', workTime: '1 ngày', status: 'Duyệt áp dụng', selected: false },
      { question: 'Câu hỏi 4', group: 'Nhóm D', workTime: '1 ngày', status: 'Ngừng áp dụng', selected: false },
      { question: 'Câu hỏi 5', group: 'Nhóm E', workTime: '5 giờ', status: 'Trả về', selected: false }
    ];
  }

  toggleMenu(rowIndex: number, button: HTMLElement) {
    this.openedRowIndex = this.openedRowIndex === rowIndex ? null : rowIndex;
    this.popupAnchor = button;
    this.cdr.detectChanges();
  }

  onItemSelectChange(item: any) {
    if (item.selected) {
      if (!this.selectedItems.includes(item)) this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
    this.allSelected = this.data.length > 0 && this.selectedItems.length === this.data.length;
    this.cdr.detectChanges();
    this.checkForDeletion();
  }

  toggleAll() {
    this.allSelected = !this.allSelected;
    this.data.forEach(item => {
      item.selected = this.allSelected;
    });
    this.selectedItems = this.allSelected ? [...this.data] : [];
    this.cdr.detectChanges();
    this.checkForDeletion();
  }

  checkForDeletion() {
    if (this.data.some(d => d.toDelete)) {
      this.data = this.data.filter(d => !d.toDelete);
      this.selectedItems = [];
      this.allSelected = false;
    }
  }
}
