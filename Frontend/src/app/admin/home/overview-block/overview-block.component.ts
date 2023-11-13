import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overview-block',
  templateUrl: './overview-block.component.html',
  styleUrls: ['./overview-block.component.scss']
})
export class OverviewBlockComponent {
  @Input('count') count : number = 0; 
  @Input('title') title : string ="";
  @Input('link') link : string = "";
  @Input('icon') icon! : string 
}
