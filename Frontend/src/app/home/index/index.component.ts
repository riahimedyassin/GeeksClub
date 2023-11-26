import { Component , OnInit } from '@angular/core';
import { VisitorService } from 'src/app/services/visitors/visitor.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  constructor(private visitorService : VisitorService){}
  ngOnInit(): void {
      this.visitorService.getCurrentIP().subscribe(data=> {
          this.visitorService.saveVisitor(data).subscribe()
      })
  }
}
