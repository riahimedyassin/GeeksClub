import { Component, Input, Query } from '@angular/core';

@Component({
  selector: 'app-quick-action',
  templateUrl: './quick-action.component.html',
  styleUrls: ['./quick-action.component.scss']
})
export class QuickActionComponent {
  @Input('title') title! : string ; 
  @Input('icon') icon! : string ; 
  @Input('link') link! : string ;
  @Input('query') query? : string
}
