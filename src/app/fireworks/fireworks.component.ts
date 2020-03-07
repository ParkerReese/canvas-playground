import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Firework } from "./firework";

@Component({
  selector: 'app-fireworks',
  templateUrl: './fireworks.component.html',
  styleUrls: ['./fireworks.component.scss']
})
export class FireworksComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', {static: true})

  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private intervalId: any;
  private requestedAnimationFrame: number;

  private fireworks: Firework[] = [];

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    // Canvas
    this.ctx = this.canvas.nativeElement.getContext('2d');
    /* Assign the width and height to stretch the canvas across the available space.
       This will not get changed on window resizing  */
    this.ctx.canvas.height = window.innerHeight - 64;
    this.ctx.canvas.width = window.innerWidth;

    // Used to not fire change detection when animating
    this.ngZone.runOutsideAngular(() => this.animate());

    // Call the animate() function ever interval in ms
    this.intervalId = setInterval(() => {
      this.animate();
    }, 15);
  }

  // Move the circles given their initialized values
  private animate(): void {
    this.requestedAnimationFrame = requestAnimationFrame(() => this.animate);

    /* Draw the background */
    this.clearCanvas();

    // ensure compositionOperation for our fireworks and particles
    // lighter creates bright highlight points as the fireworks and particles overlap each other
    this.ctx.globalCompositeOperation = 'lighter';

    // Move and draw each firework
    this.fireworks.forEach((firework, index) => {
      // Delete fireworks that have hit their destination
      if (firework.currentPos.y <= firework.target.y) {
        this.fireworks.splice(index, 1);
        return;
      }
      firework.update();
    });
  }

  private clearCanvas(): void {
    // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
    this.ctx.globalCompositeOperation = 'destination-out';
    // decrease the alpha property to create more prominent trails
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  // Handle mouse click event on the canvas
  public mouseClick(event: MouseEvent): void {
    const startPosition = {x: this.ctx.canvas.width / 2, y: this.ctx.canvas.height};
    const target = {x: event.offsetX, y: event.offsetY};
    this.fireworks.push(new Firework(this.ctx, startPosition, target))
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    cancelAnimationFrame(this.requestedAnimationFrame);
  }
}
