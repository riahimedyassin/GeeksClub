import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'], 
  imports: [LucideAngularModule, RouterLink],
  standalone:true
})
export class FooterComponent {

}
