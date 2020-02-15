import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Circle} from "./circle";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-moving-circles',
  templateUrl: './moving-circles.component.html',
  styleUrls: ['./moving-circles.component.scss']
})
export class MovingCirclesComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', {static: true})
  private canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private innerHeight: number;
  private innerWidth: number;

  private totalCircles = 5;
  private circles: Circle[] = newArray(this.totalCircles);

  constructor(private ngZone: NgZone){}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    /* Assign the width and height to stretch the canvas across the available space.
       This will not get changed on window resizing  */
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.ctx.canvas.height = this.innerHeight;
    this.ctx.canvas.width = this.innerWidth;

    this.instantiateCircles();

    this.ngZone.runOutsideAngular(() => this.animate()); // Used to not fire change detection when animating
    setInterval(() => {
      this.animate();
    }, 15);
  }

  // Create the circles
  private instantiateCircles(): void {
    const radius = 25;

    let i = 0;
    while (i < this.totalCircles) {
      const randX = Math.floor(Math.random() * this.innerWidth);
      const randY = Math.floor(Math.random() * this.innerHeight);
      const xSpeed = Math.random() < 0.5 ? -1 : 1;
      const ySpeed = Math.random() < 0.5 ? -1 : 1;

      this.circles[i] = new Circle(this.ctx, radius, randX, randY, xSpeed, ySpeed, this.innerWidth, this.innerHeight);
      i++;
    }
  }

  // Move the circles
  private animate(): void {
    this.circles.forEach(c => {
      c.move()
    });
  }

  ngOnDestroy(): void {
    clearInterval()
  }
}
