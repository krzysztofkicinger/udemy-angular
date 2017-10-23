import {Directive, ElementRef, OnInit} from "@angular/core";

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {

  constructor(private element: ElementRef) {
    console.log("BasicHighlightDirective - constructor()");
  }

  ngOnInit() {
    console.log("BasicHighlightDirective - ngOnInit()");
    this.element.nativeElement.style.backgroundColor = 'yellow';
  }

}
