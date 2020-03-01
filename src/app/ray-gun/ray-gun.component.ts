import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Laser} from "./laser";

@Component({
  selector: 'ray-gun',
  templateUrl: './ray-gun.component.html',
  styleUrls: ['./ray-gun.component.scss']
})
export class RayGunComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', {static: true})

  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  private defaultSpeed = 4;
  private defaultLength = 100;

  useCustomConfig = false;
  customSpeed = this.defaultSpeed;

  private lasers: Laser[] = [];

  private intervalId: any;
  private requestedAnimationFrame: number;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    // Canvas
    this.ctx = this.canvas.nativeElement.getContext('2d');
    /* Assign the width and height to stretch the canvas across the available space.
       This will not get changed on window resizing  */
    this.ctx.canvas.height = window.innerHeight - 64;
    this.ctx.canvas.width = window.innerWidth;

    this.ngZone.runOutsideAngular(() => this.animate()); // Used to not fire change detection when animating
    // Call the animate() function ever interval in ms
    this.intervalId = setInterval(() => {
      this.animate();
    }, 8);
  }

  // Handle mouse click event on the canvas
  public mouseClick(event: MouseEvent): void {
    // Need to offset the image of the ray gun cursor
    const xStartPos = event.offsetX;
    const yStartPos = event.offsetY + 9;
    const speed = this.useCustomConfig ? this.customSpeed : this.defaultSpeed;
    this.lasers.push(new Laser(this.ctx, xStartPos, yStartPos, speed, this.defaultLength));
  }

  // Move the circles given their initialized values
  private animate(): void {
    this.requestedAnimationFrame = requestAnimationFrame(() => this.animate);

    this.clearCanvas();
    this.lasers.forEach((laser, index) => {
      // Delete lasers that are off the page so we don't waste time drawing something you can't see
      if (!laser || laser.x > this.ctx.canvas.width + this.defaultLength) {
        this.lasers.splice(index,1);
        return;
      }
      laser.move()
    });
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    cancelAnimationFrame(this.requestedAnimationFrame);
  }

}
