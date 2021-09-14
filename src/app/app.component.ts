import { Component } from '@angular/core';
import { NavItem } from './left-nav/left-nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  NavItems: NavItem[] = [
    { routerLink: 'moving-circles', title: 'Moving Circles', icon: 'all_out' },
    { routerLink: 'lines', title: 'Lines', icon: 'line_weight' },
    { routerLink: 'ray-gun', title: 'Ray Gun', icon: 'thumb_up' },
    { routerLink: 'fireworks', title: 'Fireworks', icon: 'flare' }
  ];
}
