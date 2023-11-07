import { Component , Input } from '@angular/core';
import { date } from 'src/app/shared/models/types/date.type';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  @Input('title') title !: string
  @Input('desc') desc ! : string ; 
  @Input('date') date ! : date ; 
  @Input('participants') participants ! : number ; 

}
