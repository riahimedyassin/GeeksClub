import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone:true 
})
export class NavbarComponent {
  constructor(private router : Router) {}
  navigate(to : string) {
    this.router.navigateByUrl(to)
  }
  scroll(to :string ) {
    this.router.navigateByUrl('').then(() => {
      document.querySelector(`#${to}`)?.scrollIntoView({
        behavior:'smooth'
      })
    })
    
  }
}
