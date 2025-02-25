import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.scss']
})
export class GridWrapperComponent implements OnInit {
  data: Array<{ question: string; group: string; workTime: string; status: string; selected: boolean }> = [];
  selectedItems: any[] = [];
  showDetailPopup = false;
  openedRowIndex: number | null = null;
  popupAnchor: any;
  allSelected = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.data = [
      { question: 'Câu hỏi 1', group: 'Nhóm A', workTime: '3 ngày', status: 'Đang soạn thảo', selected: false },
      { question: 'Câu hỏi 2', group: 'Nhóm B', workTime: '2 giờ', status: 'Đã gửi duyệt', selected: false }
    ];
  }

  toggleMenu(rowIndex: number, button: HTMLElement) {
    this.openedRowIndex = this.openedRowIndex === rowIndex ? null : rowIndex;
    this.popupAnchor = button;
    this.cdr.detectChanges();
  }

  openEditPage(dataItem: any) {
    this.router.navigate(['/edit-page'], { queryParams: { id: dataItem.question } });
  }

  onItemSelectChange(item: any) {
    if (item.selected) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
    this.allSelected = this.data.length > 0 && this.selectedItems.length === this.data.length;
  }

  toggleAll() {
    this.allSelected = !this.allSelected;
    this.data.forEach(item => item.selected = this.allSelected);
    this.selectedItems = this.allSelected ? [...this.data] : [];
  }

  openDetailPopup() {
    this.showDetailPopup = true;
  }

  closeDetailPopup() {
    this.showDetailPopup = false;
  }
}
