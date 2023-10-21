import { Component } from '@angular/core';
import { RevealAnimationService } from 'src/app/shared/services/reveal-animation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private reveal : RevealAnimationService) {

  }
  private initScrollReveal(): void {
    this.reveal.initScrollReveal('bottom',1000,'.reveal-me')
    this.reveal.initScrollReveal('top',1000,'.reveal-right')
  }
  ngOnInit() {
    this.initScrollReveal()
  }
  ngAfterViewInit() {
    this.initScrollReveal()
  }
  
  showNotif : boolean = false ;
  copy() {
    navigator.clipboard.writeText("geeks.club@gmail.com"); 
    this.showNotif=true ; 
    let timeout = setTimeout(()=> {
      this.showNotif=false ;
      clearTimeout(timeout)
    },3000)
  }
}
