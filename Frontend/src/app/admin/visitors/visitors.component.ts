import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/services/visitors/visitor.service';
import { ChartService } from '../shared/services/chart.service';
import { Visitor } from 'src/app/shared/models/Visitor.model';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss'],
})
export class VisitorsComponent implements OnInit {
  visitors!: Visitor[];
  constructor(
    private visitorService: VisitorService,
    private chart: ChartService
  ) {}
  ngOnInit(): void {
    this.visitorService.getAllVisitros().subscribe((response) => {
      this.visitors = response.data;
      console.log(this.visitors)
    });
  }
}
