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
  dataset : number[] = []
  labels : string[] = [];
  stat : boolean = false ; 
  constructor(
    private visitorService: VisitorService,
    private chart: ChartService
  ) {}
  ngOnInit(): void {
    this.visitorService.getAllVisitros().subscribe((response) => {
      this.visitors = response.data;
      this.visitors.map(visitor=> {
        this.dataset.push(visitor.count || 0);
        this.labels.push(`${visitor.ip} | ${visitor.city}`)
      })
      if(this.visitors) this.chart.revealLineChart("visitorsStats",this.dataset,this.labels,"IP Address Visit Count")
      console.log(this.visitors)
    });
  }
  handleBlock(ip : string ) {
    this.visitorService.blockAccess(ip).subscribe(response=> {
        this.visitors=this.visitors.map(vistor=>{
          if(vistor.ip===ip) vistor.blocked=true;
          return vistor
        })
    })
  }
  handleGiveAccess(ip : string ) {
    this.visitorService.retrieveAccess(ip).subscribe(response=> {
      this.visitors=this.visitors.map(vistor=>{
        if(vistor.ip===ip) vistor.blocked=false;
        return vistor
      })
  })
  }
}
