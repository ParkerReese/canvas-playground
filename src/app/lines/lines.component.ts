import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {
  @ViewChild('canvas', {static: true})

  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  private colors: string[] = ['#ffbd69', '#fe346e', '#b21f66', '#381460'];

  constructor() {
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    /* Assign the width and height to stretch the canvas across the available space.
       This will not get changed on window resizing  */
    this.ctx.canvas.height = window.innerHeight - 64;
    this.ctx.canvas.width = window.innerWidth;
  }

  // Handle mouse click event on the canvas
  public mouseClick(event: MouseEvent): void {
    this.drawLine(event.offsetX, event.offsetY)
  }

  // Draw line given input location and global vars
  private drawLine(xPos: number, yPos: number) {
    this.ctx.beginPath();
    // All lines will be drawn from the bottom middle, for simplicity
    this.ctx.moveTo(this.ctx.canvas.width / 2, this.ctx.canvas.height);

    // Style the line
    const linearGradient = this.ctx.createLinearGradient(this.ctx.canvas.width / 2, this.ctx.canvas.height, xPos, yPos);
    linearGradient.addColorStop(0, 'green');
    linearGradient.addColorStop(1, 'blue');
    this.ctx.strokeStyle = linearGradient;

    this.ctx.lineTo(xPos, yPos);
    this.ctx.stroke();
  }

  public clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

}
