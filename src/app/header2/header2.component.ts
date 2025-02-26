import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component {
  @Output() searchChanged = new EventEmitter<string>();
  searchTerm = '';

  resetSearch() {
    this.searchTerm = '';
    this.searchChanged.emit('');
  }

  searchOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  search() {
    this.searchChanged.emit(this.searchTerm);
  }
}
