import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { Event } from 'src/app/shared/models/Event.model';
import { RevealAnimationService } from 'src/app/shared/services/reveal-animation.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  constructor(private scroll : RevealAnimationService , private activitieService : ActivitiesService) { }

  activities! : Event[]
  ngAfterViewInit(): void {
    this.initScrollReveal();
  }
  private initScrollReveal(): void {
    this.scroll.initScrollReveal('bottom',1000,'.reveal-element-buttom')
  }
  ngOnInit(): void {
      this.activitieService.getFeaturedActivites().subscribe((response)=> {
        console.log(response.data)
        this.activities=response.data
      })
  }
}
