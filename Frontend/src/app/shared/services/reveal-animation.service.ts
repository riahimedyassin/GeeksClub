import { ElementRef, Injectable } from '@angular/core';
import ScrollReveal from 'scrollreveal';
@Injectable({
  providedIn: 'root',
})
export class RevealAnimationService {
  constructor() {}
  public initScrollReveal(
    direction: 'left' | 'right' | 'bottom' | 'top',
    duration: number,
    className?: string, 
    myElement ?: ElementRef
  ): void {
    const sr = ScrollReveal();
    if (className) {
      sr.reveal(className, {
        duration: duration, // Animation duration in milliseconds
        origin: direction, // Origin of animation ('top', 'bottom', 'left', 'right')
        distance: '60px', // Distance to reveal element
        scale: 1, // Scale from 0 to 1 (1 = 100%)
        reset: true, // Reset animation on reveal
      });
    } else if(myElement) {
      sr.reveal(myElement.nativeElement, {
        duration: duration, // Animation duration in milliseconds
        origin: direction, // Origin of animation ('top', 'bottom', 'left', 'right')
        distance: '20px', // Distance to reveal element
        scale: 1, // Scale from 0 to 1 (1 = 100%)
        reset: true, // Reset animation on reveal
      });
    }
  }
}
