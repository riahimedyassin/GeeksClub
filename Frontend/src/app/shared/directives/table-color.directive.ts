import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTableColor]',
})
export class TableColorDirective implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {}
  @Input('appTableColor') appTableColor!: number;
  ngOnInit(): void {
    this.colorRow();
  }

  colorRow() {
    this.appTableColor % 2 === 0
      ? this.renderer.addClass(this.element.nativeElement, 'bg-deepblack')
      : null;
  }
}
