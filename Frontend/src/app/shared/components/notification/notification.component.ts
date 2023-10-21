import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input('prime') primeColor! : string ; 
  @Input('second') secondColor! : string ; 
  @Input ('color') iconColor! : string ; 
  @Input('message') messsage! : string ; 
  @Input('icon') icon! : string ; 
}
