import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Circle} from "../moving-circles/circle";

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {
@ViewChild('canvas', {static: true})

  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  private lines: Circle[] = [];

  private colors: string[] = ['#355c7d', '#6c5b7b', '#c06c84', '#f67280'];
  private radiusOptions: number[] = [8, 16, 24];

  private intervalId: any;
  private requestedAnimationFrame: number;
  constructor() { }

  ngOnInit(): void {
  }

}
