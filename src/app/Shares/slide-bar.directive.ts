import { AfterViewChecked, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSlideBar]'
})
export class SlideBarDirective implements AfterViewChecked {
  constructor(private element: ElementRef) {}

  ngAfterViewChecked(): void {
    const iconWrappers = this.element.nativeElement.querySelectorAll('kendo-icon-wrapper');
    iconWrappers.forEach((svgIcon: HTMLElement) => {
      const spanIcon = document.createElement('span');
      spanIcon.className = 'k-icon k-i-arrow-chevron-down';
      svgIcon.replaceWith(spanIcon);
    });
  }
}
