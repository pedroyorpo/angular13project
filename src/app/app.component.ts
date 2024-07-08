import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
  trigger('slideInOut', [
    state('in', style({
      transform: 'translateY(0)',
      opacity: 1
    })),
    state('out', style({
      transform: 'translateY(100%)',
      opacity: 0
    })),
    transition('in => out', animate('400ms ease-out')),
    transition('out => in', animate('400ms ease-in'))
  ])
]
})

export class AppComponent {
  title = 'Payroll Sytem Agency';
  sliderAnimationState = 'in'; // Initial state
  
  showNavbar = false;
  constructor(private router: Router) {}

  toggleSlider() {
    this.sliderAnimationState = this.sliderAnimationState === 'in' ? 'out' : 'in';
  }
  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = !event.urlAfterRedirects.includes('/login');
      });
    }

}

