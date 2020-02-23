import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LeftNavComponent} from './left-nav/left-nav.component';
import {MaterialModule} from "./material-module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule, Routes} from "@angular/router";
import {LinesComponent} from './lines/lines.component';
import {MovingCirclesComponent} from "./moving-circles/moving-circles.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {ColorPickerModule} from "ngx-color-picker";

const appRoutes: Routes = [
  {path: '', component: MovingCirclesComponent, data: {title: 'Moving Circles'}},
  {path: 'moving-circles', component: MovingCirclesComponent, data: {title: 'Moving Circles'}},
  {path: 'lines', component: LinesComponent, data: {title: 'Lines'}}
];

@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    MovingCirclesComponent,
    LinesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ColorPickerModule,
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
