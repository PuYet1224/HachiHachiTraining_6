import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuStateService } from './services/menu-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'HachiHachiTraining_5';
  isPersonalInfoSelected: boolean = false;
  private sub!: Subscription; 

  constructor(private menuStateService: MenuStateService) {}

  ngOnInit(): void {
    this.sub = this.menuStateService.selectedMenu$.subscribe(selectedMenu => {
      this.isPersonalInfoSelected = selectedMenu === 'Hồ sơ nhân sự > Thông tin cá nhân';
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
