import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const text = this.el.nativeElement.innerText.trim();
    if (text) {
      this.el.nativeElement.title = text;
    }
  }
}
