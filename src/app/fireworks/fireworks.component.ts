import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fireworks',
  templateUrl: './fireworks.component.html',
  styleUrls: ['./fireworks.component.scss']
})
export class FireworksComponent implements OnInit {
  @ViewChild('canvas', {static: true})

  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

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
  }
}
