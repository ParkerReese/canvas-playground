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

  // Canvas
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;

  private renderer: THREE.WebGLRenderer;

  private screenSize: {
    width: number;
    height: number;
  };

  // Debug
  // private gui = new dat.GUI();

  // Scene
  private scene = new THREE.Scene();

  // Objects
  private geometry = new THREE.TorusGeometry(.7, .2, 16, 100);

  // Materials
  private material = new THREE.MeshBasicMaterial();

  // CLOCK
  private clock: THREE.Clock;

  // MESH
  private sphere: THREE.Mesh;

  // CAMERA
  private camera = THREE.PerspectiveCamera;

  private controls: OrbitControls;


  private intervalId: any;
  private requestedAnimationFrame: number;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.screenSize = { width: window.innerWidth, height: window.innerHeight - 64 };

    this.material.color = new THREE.Color(0x00f0ff);

    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.sphere);

    const pointLight = new THREE.PointLight(0x000000, 0.1);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    this.scene.add(pointLight);

    /**
     * Camera
     */
    // Base camera
    this.camera = new THREE.PerspectiveCamera(75, this.screenSize.width / this.screenSize.height, 0.1, 100);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 2;
    this.scene.add(this.camera);

    // Controls
    this.controls = new OrbitControls(this.camera, this.canvas.nativeElement);
    this.controls.enableDamping = true;

    /**
     * Renderer
     */
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement
    });

    this.renderer.setSize(this.screenSize.width, this.screenSize.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.clock = new THREE.Clock();

    this.ngZone.runOutsideAngular(() => this.tick()); // Used to not fire change detection when animating
    // Call the animate() function ever interval in ms
    this.intervalId = setInterval(() => {
      this.tick();
    }, 15); // 15ms is a little bit faster than 60Hz
  }

  tick(): void {
    this.requestedAnimationFrame = requestAnimationFrame(() => this.tick);
    const elapsedTime = this.clock.getElapsedTime();

    // // Update objects
    this.sphere.rotation.y = .5 * elapsedTime;

    // Update Orbital Controls
    this.controls.update();

    // Render
    this.renderer.render(this.scene, this.camera);
  }

}
