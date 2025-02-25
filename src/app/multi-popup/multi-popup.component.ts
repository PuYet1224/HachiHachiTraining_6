import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-multi-popup',
  templateUrl: './multi-popup.component.html',
  styleUrls: ['./multi-popup.component.scss']
})
export class MultiPopupComponent {
  @Input() selectedItems: any[] = [];
  showDetailPopup = false;
  popupAnchor: any;

  sendForApproval() {}
  returnItem() {}
  approveApply() {}
  stopApply() {}
  deleteItem() {}
  closeDetailPopup() {
    this.showDetailPopup = false;
  }
}
