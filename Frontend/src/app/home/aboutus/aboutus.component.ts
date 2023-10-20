import { Component, OnInit , HostListener, ElementRef , ViewChild } from '@angular/core'; 
import { RevealAnimationService } from 'src/app/shared/services/reveal-animation.service';
import  ScrollReveal from 'scrollreveal' ; 
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
})
export class AboutusComponent {
  aboutus = [
    { title: 'Foundation', text: 'Found in 2024', icon: 'calendar' },
    {
      title: 'Goals',
      text: 'Solving problems with the help of tech',
      icon: 'crosshair',
    },
    {
      title: 'Requirments',
      text: 'Active members to share their thoughts',
      icon: 'app-window',
    },
    {
      title: 'Creativity',
      text: 'It is the main theme of this club',
      icon: 'plus-square',
    },
    {
      title:"Points",
      text : "Claim points and win epic rewards",
      icon : "gift"
    }, {
      title:"Courses",
      text:"Valuable free courses",
      icon : "dollar-sign"
    }, 
    {
      title : "Collaboration",
      text : "between members and other clubs",
      icon : "git-branch-plus"
    },
    {
      title:"Work Flow",
      text : "All the job is done remotly",
      icon : 'laptop-2'
    }
  ];
  constructor(private scroll : RevealAnimationService) { }
  ngAfterViewInit(): void {
    this.initScrollReveal();
  }
  private initScrollReveal(): void {
    this.scroll.initScrollReveal('left',2000,'.reveal-element')
  }
  
}
