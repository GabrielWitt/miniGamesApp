import { Injectable } from '@angular/core';
import type { ElementRef, QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor(private animationCtrl: AnimationController){}
  
  async animationSuccess(item: ElementRef){
    return new Promise((resolve) => {
      const successAnimation: Animation = this.animationCtrl
        .create()
        .addElement(item.nativeElement)
        .keyframes([
          { offset: 0, transform: 'scale(1)', opacity: '1' },
          { offset: 0.5, transform: 'scale(1.5)', opacity: '0.3' },
          { offset: 1, transform: 'scale(1)', opacity: '1' },
        ]);
        successAnimation.play();
        setTimeout(() => { 
          successAnimation.stop();
          resolve('done')
        }, 2000);
    });
  }
  
  async animationError(item: HTMLElement){
    return new Promise((resolve) => {
      console.log(item)
      const errorAnimation: Animation = this.animationCtrl
        .create()
        .addElement(item)
        .keyframes([
          { offset: 0, transform: 'scale(1) rotate(0)' },
          { offset: 0.5, transform: 'scale(1.5) rotate(45deg)' },
          { offset: 1, transform: 'scale(1) rotate(0) ' },
        ]);
        console.log('error animate')
        errorAnimation.play();
        setTimeout(() => { 
          errorAnimation.stop();
          resolve('done')
        }, 2000);
    });
  }
}
