import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Circle} from './circle';

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

  defaultCircleCount = 50;
  maxCircleCount = 250;
  private circles: Circle[] = [];

  private colors: string[] = ['#355c7d', '#6c5b7b', '#c06c84', '#f67280'];
  private radiusOptions: number[] = [8, 16, 24];

  private intervalId: any;
  private requestedAnimationFrame: number;

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

    // Instantiate all default circles
    for (let i = 0; i < this.defaultCircleCount; i++) {
      this.instantiateCircle();
    }

    this.ngZone.runOutsideAngular(() => this.animate()); // Used to not fire change detection when animating
    // Call the animate() function ever interval in ms
    this.intervalId = setInterval(() => {
      this.animate();
    }, 15); // 15ms is a little bit faster than 60Hz
  }

  totalCirclesChange(newTotal: number) {
    const currentLength = this.circles.length;
    const difference = newTotal - currentLength;

    if (difference > 0) {
      // Add more circles
      let i = 0;
      while (i < difference) {
        this.instantiateCircle();
        i++;
      }
    } else if (difference < 0) {
      // Remove circles
      let i = 0;
      while (i < -difference) {
        this.circles.pop();
        i++;
      }
    }
  }

  // Create a circle
  private instantiateCircle(): void {
    const randRadius = this.radiusOptions[Math.floor(Math.random() * this.radiusOptions.length)];
    const diameter = randRadius * 2;
    // Dont let the circle spawn outside the bounds of the window
    const randXCoord = Math.floor(Math.random() * (this.innerWidth - diameter)) + randRadius;
    const randYCoord = Math.floor(Math.random() * (this.innerHeight - diameter)) + randRadius;

    const minusOrPlus = (): number => {
      return (Math.random() < 0.5 ? -1 : 1);
    };
    const randXSpeed = minusOrPlus() * Math.random() * 3;
    const randYSpeed = minusOrPlus() * Math.random() * 3;

    const randColor = this.colors[Math.floor(Math.random() * this.colors.length)];

    this.circles.push(new Circle(
      this.ctx, randRadius, randXCoord, randYCoord,
      randXSpeed, randYSpeed, this.innerWidth, this.innerHeight, randColor
    ));
  }

  // Move the circles given their initialized values
  private animate(): void {
    this.requestedAnimationFrame = requestAnimationFrame(() => this.animate);

    this.clearCanvas();
    this.circles.forEach(c => {
      if (!c) {
        console.error('Null circle in array');
        return;
      }
      c.move();
    });
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    cancelAnimationFrame(this.requestedAnimationFrame);
  }
}
