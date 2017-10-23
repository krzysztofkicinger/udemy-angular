import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostBinding('class.open')
  private isOpen = false;

  @HostListener('click')
  onClick(eventData: Event) {
    this.isOpen = !this.isOpen;
    // this.toggleClass("open");
  }

  private toggleClass(className: string) {
    if(this.hasClass(className)) {
      this.renderer.removeClass(this.element.nativeElement, className);
    } else {
      this.renderer.addClass(this.element.nativeElement, className);
    }
  }

  private hasClass(className: string) : boolean {
    return this.element.nativeElement.classList.contains(className);
  }

}
