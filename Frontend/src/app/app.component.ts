import { Component, OnInit } from '@angular/core';
import { RevealAnimationService } from './shared/services/reveal-animation.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  navigating: boolean = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.navigating = true;
      }
      if (event instanceof NavigationEnd) {
        this.navigating = false;
      }
    });
  }
}
