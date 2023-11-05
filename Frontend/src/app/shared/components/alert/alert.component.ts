import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input('title') title : string = ''; 
  @Input('message') message : string = "Error Occured"; 
  @Input('status') status : boolean = false ; 

}
