import { Component, Input, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  imports: [LucideAngularModule],
  styleUrls: ['./notification.component.scss'],
  standalone: true,
})
export class NotificationComponent implements OnInit {
  @Input('prime') primeColor!: string;
  @Input('second') secondColor!: string;
  @Input('color') iconColor!: string;
  @Input('message') messsage!: string;
  @Input('icon') icon!: string;
  mainClass: string = '';
  ngOnInit(): void {
    
  }
}
