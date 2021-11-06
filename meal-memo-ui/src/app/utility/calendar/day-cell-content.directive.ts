import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[appDayCellContent]'
})
export class DayCellContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
