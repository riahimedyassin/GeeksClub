import { Component } from '@angular/core';
import { RevealAnimationService } from 'src/app/shared/services/reveal-animation.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
  constructor(private scroll : RevealAnimationService) { }
  ngAfterViewInit(): void {
    this.initScrollReveal();
  }
  private initScrollReveal(): void {
    this.scroll.initScrollReveal('bottom',1000,'.reveal-element-buttom')
  }
}
