import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { Event } from 'src/app/shared/models/Event.model';
import { RevealAnimationService } from 'src/app/shared/services/reveal-animation.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  constructor(
    private scroll: RevealAnimationService,
    private activitieService: EventsService,
  ) {}

  activities!: Event[];
  error: boolean = false;
  ngAfterViewInit(): void {
    this.initScrollReveal();
  }
  private initScrollReveal(): void {
    this.scroll.initScrollReveal('bottom', 1000, '.reveal-element-buttom');
  }
  ngOnInit(): void {
    this.activitieService.getFeaturedEvents().subscribe(
      (response) => {
        this.activities = response.data;
      },
      (error: HttpErrorResponse) => {
        this.error = true;
      }
    );
  }
}
