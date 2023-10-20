import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router : Router) {}
  navigate() {
    this.router.navigateByUrl("register")
  }
  scroll(to :string ) {
    document.querySelector(`#${to}`)?.scrollIntoView({
      behavior:'smooth'
    })
  }
}
