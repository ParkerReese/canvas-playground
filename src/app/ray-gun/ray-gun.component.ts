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
  private defaultWidth = 2;
  private defaultColor= 'rgba(255,0,0,1)'; // red
  private defaultGlowWidth = 1;
  useCustomConfig = false;
  customSpeed = this.defaultSpeed;
  customLength = this.defaultLength;
  customWidth = this.defaultWidth;
  customColor = this.defaultColor;
  customGlowWidth = this.defaultGlowWidth;

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
    let speed, length, width, color, glowWidth;
    if (this.useCustomConfig) {
      speed = this.customSpeed;
      length = this.customLength;
      width = this.customWidth;
      color = this.customColor;
      glowWidth = this.customGlowWidth;
    } else {
      speed = this.defaultSpeed;
      length = this.defaultLength;
      width = this.defaultWidth;
      color = this.defaultColor;
      glowWidth = this.defaultGlowWidth;
    }
    // Need to offset the image of the ray gun cursor
    const xStartPos = event.offsetX - (length/4);
    const yStartPos = event.offsetY + 9;

    this.lasers.push(new Laser(this.ctx, xStartPos, yStartPos, speed, length, width, color, glowWidth));
  }

  // Move the circles given their initialized values
  private animate(): void {
    this.requestedAnimationFrame = requestAnimationFrame(() => this.animate);

    this.clearCanvas();
    this.lasers.forEach((laser, index) => {
      // Delete lasers that are off the page so we don't waste time drawing something you can't see
      const length = this.useCustomConfig ? this.customLength : this.defaultLength;
      if (!laser || laser.x > this.ctx.canvas.width + length) {
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
