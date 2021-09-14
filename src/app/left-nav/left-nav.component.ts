import { Component, Input } from '@angular/core';

export interface NavItem {
  routerLink: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent {
  @Input() NavItems: NavItem[];

  constructor() {
  }
}
