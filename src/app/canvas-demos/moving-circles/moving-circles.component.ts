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

  private totalCircles = 50;
  private circleRadius = 25;
  private circles: Circle[] = newArray(this.totalCircles);

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    /* Assign the width and height to stretch the canvas across the available space.
       This will not get changed on window resizing  */
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight - 64; // minus height of nav bar
    this.ctx.canvas.height = this.innerHeight;
    this.ctx.canvas.width = this.innerWidth;

    this.instantiateCircles();

    this.ngZone.runOutsideAngular(() => this.animate()); // Used to not fire change detection when animating
    // Call the animate() function ever interval in ms
    setInterval(() => {
      this.animate();
    }, 15); // 15ms is a little bit faster than 60Hz
  }

  // Create the circles
  private instantiateCircles(): void {
    const diameter = this.circleRadius * 2;

    let i = 0;
    while (i < this.totalCircles) {
      // Dont let the circle spawn outside the bounds of the window
      const randXCoord = Math.floor(Math.random() * (this.innerWidth - diameter)) + this.circleRadius;
      const randYCoord = Math.floor(Math.random() * (this.innerHeight - diameter)) + this.circleRadius;
      const minusOrPlus = (): number => {
        return (Math.random() < 0.5 ? -1 : 1);
      };
      const randXSpeed = minusOrPlus() * Math.random() * 3;
      const randYSpeed = minusOrPlus() * Math.random() * 3;

      this.circles[i] = new Circle(
        this.ctx, this.circleRadius, randXCoord, randYCoord,
        randXSpeed, randYSpeed, this.innerWidth, this.innerHeight
      );
      i++;
    }
  }

  // Move the circles given their initialized values
  private animate(): void {
    requestAnimationFrame(() => this.animate);

    this.clearCanvas();
    this.circles.forEach(c => {
      c.move()
    });
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);
  }

  ngOnDestroy(): void {
    clearInterval()
  }
}
