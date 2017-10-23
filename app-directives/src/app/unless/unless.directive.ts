import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  constructor(private template: TemplateRef<any>,
              private container: ViewContainerRef) {
  }

  @Input('appUnless')
  set unless(condition: boolean) {
    if (!condition) {
      this.container.createEmbeddedView(this.template);
    } else {
      this.container.clear();
    }
  }

}
