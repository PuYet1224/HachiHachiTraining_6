import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.scss']
})
export class Header1Component {
  constructor(private router: Router) {}

  get isEditPage(): boolean {
    return this.router.url.includes('/edit-page');
  }

  navigateToAddPage() {
    this.router.navigate(['/edit-page'], { queryParams: { id: 'new' } });
  }
}
