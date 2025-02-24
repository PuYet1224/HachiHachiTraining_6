import { Component } from '@angular/core';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.scss']
})
export class Header1Component {
  // Demo: quản lý danh sách các status được chọn
  public statuses: string[] = [];

  // Kiểm tra nút đó có đang được chọn hay không
  isSelected(status: string): boolean {
    return this.statuses.includes(status);
  }

  // Toggle logic cơ bản
  toggle(status: string): void {
    if (this.isSelected(status)) {
      this.statuses = this.statuses.filter(s => s !== status);
    } else {
      this.statuses.push(status);
    }
  }

  onAddNew() {
    // Code xử lý khi bấm "THÊM MỚI"
    alert('Thêm mới!');
  }
}
