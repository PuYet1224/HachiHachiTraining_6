import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuStateService } from './services/menu-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'HachiHachiTraining_5';
  isPersonalInfoSelected: boolean = false;
  currentMode: string = 'NHÂN SỰ';
  private subs = new Subscription();

  constructor(
    private menuStateService: MenuStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.menuStateService.selectedMenu$.subscribe(selectedMenu => {
        this.isPersonalInfoSelected = (selectedMenu === 'Hồ sơ nhân sự > Thông tin cá nhân');
      })
    );

    this.subs.add(
      this.menuStateService.mode$.subscribe(mode => {
        this.currentMode = mode;
      })
    );
  }

  get isEditPage(): boolean {
    return this.router.url.includes('/edit-page');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
