import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'], 
  imports: [LucideAngularModule, CommonModule],
  standalone:true
})
export class AlertComponent {
  @Input('title') title : string = ''; 
  @Input('message') message : string = "Error Occured"; 
  @Input('status') status : boolean = false ; 
  @Output() hide : EventEmitter<boolean> = new EventEmitter<boolean>() ; 
  hideMe :boolean = false  ;
  emithidden() {
    this.hideMe=true ; 
    this.hide.emit(true)
  }
}
