import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  private canvasView: ElementRef<HTMLCanvasElement>;
  private canvas: HTMLCanvasElement;

  private clock: THREE.Clock;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private gui: dat.GUI;

  private rotatingMesh: THREE.Mesh[] = [];

  constructor(private ngZone: NgZone) {
  }

  initDebugger() {
    this.gui = new dat.GUI();
  }

  initClock(): void {
    this.clock = new THREE.Clock();
  }

  initCanvas(): void {
    this.canvas = this.canvasView.nativeElement;
  }

  initCamera(viewWidth: number, viewHeight: number): void {
    if (!this.camera) {
      this.camera = new THREE.PerspectiveCamera();
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 2;
      this.camera.near = 0.1;
      this.camera.far = 100;
      this.camera.fov = 70;
    }

    this.camera.aspect = viewWidth / viewHeight;
    this.camera.updateProjectionMatrix();
  }

  initLights(): THREE.Light[] {
    const pointLight = new THREE.PointLight(0x000000, 0.1);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    return [pointLight];
  }

  initMeshs(): THREE.Mesh[] {
    const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xFFFFFF),
      wireframe: true,
    });
    const donut = new THREE.Mesh(geometry, material);

    this.rotatingMesh.push(donut);
    return [donut];
  }

  initScene(lights: THREE.Light[], meshs: THREE.Mesh[]): void {
    this.scene = new THREE.Scene();

    meshs?.forEach(mesh => {
      this.scene.add(mesh);
    });
    lights?.forEach(light => {
      this.scene.add(light);
    });

    this.scene.add(this.camera);
  }

  initRenderer(viewWidth: number, viewHeight: number): void {
    if (!this.renderer) {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas
      });
    }

    this.renderer.setSize(viewWidth, viewHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  initControls(): void {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
  }

  ngOnInit(): void {
    const width = window.innerWidth;
    const height = window.innerHeight - 56; // -56 due to top menu bar

    this.initCanvas();
    this.initCamera(width, height);
    this.initRenderer(width, height);
    this.initClock();
    this.initControls();
    const lights = this.initLights();
    const meshs = this.initMeshs();
    this.initScene(lights, meshs);

    this.animate();
  }

  animate(): void {
    // Run outside angular zone to eliminate change dection issues
    this.ngZone.runOutsideAngular(() => {
      this.render();
      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  // Render a single frame
  public render(): void {
    requestAnimationFrame(() => {
      this.render();
    });
    const elapsedTime = this.clock.getElapsedTime();

    // Update objects
    this.rotatingMesh?.forEach(mesh => {
      mesh.rotation.y = .5 * elapsedTime;
    });

    // Update Orbital Controls
    this.controls.update();

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  // Update given new window size
  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight - 56;

    this.initCamera(width, height);
    this.initRenderer(width, height);
  }

}
