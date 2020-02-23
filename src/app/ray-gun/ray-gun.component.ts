import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Laser} from "./laser";

@Component({
  selector: 'ray-gun',
  templateUrl: './ray-gun.component.html',
  styleUrls: ['./ray-gun.component.scss']
})
export class RayGunComponent implements OnInit {
  @ViewChild('canvas', {static: true})

  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  private lasers: Laser[] = [];

  constructor() {
  }

  ngOnInit(): void {
    // Canvas
    this.ctx = this.canvas.nativeElement.getContext('2d');
    /* Assign the width and height to stretch the canvas across the available space.
       This will not get changed on window resizing  */
    this.ctx.canvas.height = window.innerHeight - 64;
    this.ctx.canvas.width = window.innerWidth;
  }

  // Handle mouse click event on the canvas
  public mouseClick(event: MouseEvent): void {
    // Need to offset the image of the ray gun cursor
    const xStartPos = event.offsetX;
    const yStartPos = event.offsetY + 9;
    this.lasers.push(new Laser(this.ctx, xStartPos, yStartPos));
  }

}
