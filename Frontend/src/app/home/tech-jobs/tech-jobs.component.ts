import { Component, OnInit } from '@angular/core';
import { TechJobsService } from '../services/tech-jobs.service';
import { Job } from 'src/app/shared/models/Job.model';

@Component({
  selector: 'app-tech-jobs',
  templateUrl: './tech-jobs.component.html',
  styleUrls: ['./tech-jobs.component.scss'],
})
export class TechJobsComponent implements OnInit {
  constructor(private techJobs: TechJobsService) {}
  jobs!: Job[];

  ngOnInit(): void {
    this.techJobs.getJobs().subscribe((res) => {
      this.jobs = res.items;
    });
  }
}
