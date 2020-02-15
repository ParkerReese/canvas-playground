import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LeftNavComponent} from './left-nav/left-nav.component';
import {MaterialModule} from "./material-module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule, Routes} from "@angular/router";
import {MovingCirclesComponent} from "./canvas-demos/moving-circles/moving-circles.component";

const appRoutes: Routes = [
  {path: '',  component: MovingCirclesComponent, data: {title: 'Moving Circles'}},
  {path: 'moving-circles', component: MovingCirclesComponent, data: {title: 'Moving Circles'}}
];

@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    MovingCirclesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      {
        useHash: false,
        onSameUrlNavigation: "ignore"
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
