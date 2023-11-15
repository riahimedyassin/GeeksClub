import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { ForumsService } from 'src/app/dashboard/shared/services/forum/forums.service';
import { EventsService } from 'src/app/services/events/events.service';
import { Admin } from 'src/app/shared/models/Admin.model';
import { Forum } from 'src/app/shared/models/Forum.model';
import { Event } from 'src/app/shared/models/Event.model';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { User } from 'src/app/shared/models/User.model';
import { Chart, registerables } from 'chart.js';
import { ChartService } from '../shared/services/chart.service';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private forumsService: ForumsService,
    private eventService: EventsService,
    private userService: UserService,
    private chartService: ChartService
  ) {}
  admin!: Admin;
  forums!: Forum[];
  events!: Event[];
  members!: User[];
  datasetForums: number[] = [];
  labelsForums: string[] = [];
  datasetMembers: number[] = [];
  labelsMembers: string[] = [];
  isLoading: boolean = true;
  ngOnInit(): void {
    this.adminService.getCurrentAdmin().subscribe((response) => {
      this.admin = response.data;
      this.forumsService.getAllForums().subscribe((response) => {
        this.forums = response.data;
        for (let i = 0; i < this.forums.length; i++) {
          this.labelsForums.push(this.forums[i].name);
          this.datasetForums.push(this.forums[i].articles.length);
        }
        this.chartService.revealCharts(
          'forumsStats',
          this.datasetForums,
          this.labelsForums,
          'Forums Articles Published '
        );
        this.eventService.getAllEvenets().subscribe((response) => {
          this.events = response.data;
          this.userService.getAllMembers(1).subscribe((response) => {
            this.members = response.data;
            this.isLoading = false;
            for (let i = 0; i < this.members.length; i++) {
              this.labelsMembers.push(
                `${this.members[i].name} ${this.members[i].forname}`
              );
              this.datasetMembers.push(
                <number>this.members[i].points?.week_point
              );
            }
            this.chartService.revealCharts('membersStats',this.datasetMembers,this.labelsMembers,'Members Activities')
          });
        });
      });
    });
  }
}
