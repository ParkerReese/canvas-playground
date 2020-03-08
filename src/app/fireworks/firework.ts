import { Coordinate, random } from "../shared";
import { Particle } from "./particle";

export class Firework {
  // Current actual position
  private curPosition: Coordinate;
  // Used to create a tail
  private pastPositions: Coordinate[] = [];
  private pastPositionsLength: number = 3;
  // Angle between the bottom of the canvas and the path of the firework to the target
  private angle: number;
  // Movement
  private speed: number = 1.5;
  private acceleration: number = 1.05;

  // Explosion particles when we've reach the target
  private exploded: boolean = false;
  private particles: Particle[] = [];
  private particleTotal: number = 90;

  // Used for the owner of this object to know if it can be cleaned up
  private _canDelete: boolean = false;

  constructor(private ctx: CanvasRenderingContext2D,
              // Starting position
              private startPos: Coordinate,
              // Ending position
              private targetPos: Coordinate
  ) {
    // Initialize positions and angle
    for (let i = 0; i < this.pastPositionsLength; i++) {
      this.pastPositions.push({x: startPos.x, y: startPos.y});
    }
    this.curPosition = {x: startPos.x, y: startPos.y};
    this.angle = Math.atan2(targetPos.y - startPos.y, targetPos.x - startPos.x);
  }

  public update() {
    // Move the firework if we haven't exploded
    if (!this.exploded) {
      this.move();
      this.draw();
      // When we reach our destination, explode
      if (this.curPosition.y <= this.targetPos.y) {
        while (this.particleTotal--) {
          this.particles.push(new Particle(this.ctx, this.curPosition))
        }
        this.exploded = true;
      }
    } else {
      // Move the particles instead
      this.particles.forEach((particle, index) => {
        if (particle.canDelete) {
          this.particles.splice(index, 1);
          return;
        }
        particle.update();
      });
    }
    if (this.exploded && this.particles.length <= 0) {
      this._canDelete = true;
    }
  }

// Move firework to next position
  private move() {
    // remove last item in coordinates array
    this.pastPositions.pop();
    // add current coordinates to the beginning of the array
    this.pastPositions.unshift({x: this.curPosition.x, y: this.curPosition.y});
    // speed up the firework
    this.speed *= this.acceleration;
    // get the current velocities based on angle and speed
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    // assign next position given current position and vector
    this.curPosition.x += vx;
    this.curPosition.y += vy;
  }

// Draw firework given latest position
  private draw() {
    this.ctx.beginPath();
    // move to the last oldest position in the set, then draw a line to the current x and y
    const pastPos = this.pastPositions[this.pastPositionsLength - 1];
    this.ctx.moveTo(pastPos.x, pastPos.y);
    this.ctx.lineTo(this.curPosition.x, this.curPosition.y);
    this.ctx.strokeStyle = this.randColor();
    this.ctx.stroke();
  }

// returns a random hsl color https://www.w3schools.com/colors/colors_hsl.asp
  private randColor(): string {
    return 'hsl(' + random(0, 360) + ', 100%, ' + random(50, 60) + '%)';
  }

  public get canDelete() {
    return this._canDelete;
  }
}
