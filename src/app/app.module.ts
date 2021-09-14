import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { LinesComponent } from './lines/lines.component';
import { MovingCirclesComponent } from './moving-circles/moving-circles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { RayGunComponent } from './ray-gun/ray-gun.component';
import { FireworksComponent } from './fireworks/fireworks.component';
import { DonutComponent } from './threejs/donut/donut.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/moving-circles' },
  { path: 'moving-circles', component: MovingCirclesComponent },
  { path: 'lines', component: LinesComponent },
  { path: 'ray-gun', component: RayGunComponent },
  { path: 'fireworks', component: FireworksComponent },
  { path: 'donut', component: DonutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    MovingCirclesComponent,
    LinesComponent,
    RayGunComponent,
    FireworksComponent,
    DonutComponent,
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
        onSameUrlNavigation: 'ignore'
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
