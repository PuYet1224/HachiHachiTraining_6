import { Component } from '@angular/core';
import { iconList } from "../../assets/icons/icon-lists";

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component {
  searchTerm: string = '';
  companyList: string[] = ['Việt Hạ Chí', 'Lập Sơn', 'Việt Hạ Chí'];
  selectedCompanies: string[] = [];

  public icons = iconList;

  resetSearch() {
    this.searchTerm = '';
    this.selectedCompanies = [];
    console.log('Bộ lọc đã được reset');
  }

  searchOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  search() {
    console.log('Đang tìm kiếm:', this.searchTerm, this.selectedCompanies);
  }
}
