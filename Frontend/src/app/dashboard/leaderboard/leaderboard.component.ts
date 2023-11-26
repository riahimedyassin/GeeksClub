import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { points } from 'src/app/shared/models/types/points.type';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
    leaderboard! : {name : string ,forname : string , points : points }[]; 
    tiers! : any ; 
    error : boolean = false;
    constructor(private eventService : EventsService,private userService : UserService){}
    ngOnInit(): void {
        this.eventService.getLeaderBoard().subscribe(response=> {
          this.leaderboard=response.data
        },(err)=> {
          this.error = true ; 
          setTimeout(()=> this.error=false , 3000)
        })
        this.tiers=this.userService.getAllTiers()
    }
    handleTier(points : number) {
        return this.userService.getTier(points)
    }
}
