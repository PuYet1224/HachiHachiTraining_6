import { Component, ViewEncapsulation } from '@angular/core';
import { BadgePosition } from '@progress/kendo-angular-indicators';

@Component({
  selector: 'app-headerwide',
  templateUrl: './headerwide.component.html',
  styleUrls: ['./headerwide.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderWideComponent {
  public badgePosition: BadgePosition = <BadgePosition>'topEnd';
}