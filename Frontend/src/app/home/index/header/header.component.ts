import { Component , OnInit } from '@angular/core';
import { RevealAnimationService } from 'src/app/shared/services/reveal-animation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private reveal : RevealAnimationService) {}
  scroll() {
    document.querySelector("#aboutus")?.scrollIntoView({
      behavior:'smooth'
    })
  }
  ngOnInit() {
    this.reveal.initScrollReveal('top',2000,'.reveal-me')
  }

}
