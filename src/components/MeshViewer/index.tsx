import * as THREE from "three";
import React, { RefObject } from "react";
import "./style.css";
import { Dimmer, Loader, Button } from "semantic-ui-react";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import _ from "lodash";

import {
  changeCameraKeys,
  ROTATE_KEY_CODE,
  CAM_DISTANCE,
  changeCameraTopBottomKeys,
  meshRotationMatrix
} from "./config";

/* jslint browser: true */
/* global window */

class MeshViewer extends React.Component<
  { ref?: RefObject<MeshViewer> | undefined; data: any; onCameraUpdate?: any },
  { toggleRotate: boolean }
> {
  scene: THREE.Scene;

  loading: boolean;

  canvas: any;

  cameraTarget!: THREE.Vector3;

  camera!: THREE.PerspectiveCamera;

  renderer!: THREE.WebGLRenderer;

  canvasAxes: any;

  canvasAxesRenderer!: THREE.WebGLRenderer;

  canvasAxesScene!: THREE.Scene;

  canvasAxesCamera!: THREE.PerspectiveCamera;

  controls!: TrackballControls;

  transformControl: any;

  frameId!: number;

  mesh: any;

  constructor(
    props: Readonly<{
      ref?: RefObject<MeshViewer> | undefined;
      data: any;
      onCameraUpdate?: any;
    }>
  ) {
    super(props);

    this.scene = new THREE.Scene();
    this.loading = true;
    this.state = {
      toggleRotate: false
    };

    window.addEventListener("keydown", this.onKeyDown, false);
    window.addEventListener("resize", this.onWindowResize, false);
  }

  componentDidMount() {
    // [Default Canvas]
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(35, width / height, 1, 15);
    this.cameraTarget = new THREE.Vector3(0, -0.25, 0);
    camera.position.set(0, 0.15, 4);
    this.camera = camera;

    // Ground
    const plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(100, 100),
      new THREE.MeshPhongMaterial({
        color: 0x999999,
        specular: 0x101010
      })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.75;
    this.scene.add(plane);
    plane.receiveShadow = false;

    // Lights
    this.scene.add(new THREE.HemisphereLight(0x443333, 0x111122));
    this.scene.fog = new THREE.Fog(0x72645b, 2, 15);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setClearColor(this.scene.fog.color);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMap.renderReverseSided = THREE.CullFaceBack; //@todo

    // Shadow Light
    this.addShadowedLight(1, 1, 1, 0xffffff, 1.35);
    this.addShadowedLight(0.5, 1, -1, 0xffaa00, 1);
    this.addShadowedLight(-1, 1, 1, 0xffffff, 0.5);
    this.addShadowedLight(-1, 1, -1, 0xffffff, 0.5);

    this.canvas.appendChild(this.renderer.domElement);

    // [canvasAxes]
    const axesWidth = this.canvasAxes.clientWidth;
    const axesHeight = this.canvasAxes.clientHeight;

    // canvasAxes - Renderer
    const canvasAxesRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    canvasAxesRenderer.setClearColor(0x000000, 0);
    canvasAxesRenderer.setSize(axesWidth, axesHeight);

    this.canvasAxes.appendChild(canvasAxesRenderer.domElement);

    // canvasAxes - Scene
    const canvasAxesScene = new THREE.Scene();

    // canvasAxes - Camera
    const canvasAxesCamera = new THREE.PerspectiveCamera(
      50,
      axesWidth / axesHeight,
      1,
      1000
    );
    canvasAxesCamera.up = camera.up; // important!

    // canvasAxes - Axes
    const axes2 = new THREE.AxesHelper(100);
    canvasAxesScene.add(axes2);

    this.canvasAxesRenderer = canvasAxesRenderer;
    this.canvasAxesScene = canvasAxesScene;
    this.canvasAxesCamera = canvasAxesCamera;

    this.initControls();
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.canvas.removeChild(this.renderer.domElement);
    window.removeEventListener("resize", this.onWindowResize);
  }

  onWindowResize = () => {
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  };

  // eslint-disable-next-line consistent-return
  onKeyDown = ({ keyCode }: { keyCode: number }) => {
    // eslint-disable-next-line no-undef
    const activeElement = document.activeElement
      ? // eslint-disable-next-line no-undef
        document.activeElement.tagName.toLowerCase()
      : null;

    if (!this.mesh || activeElement === "input") {
      return false;
    }

    if (Object.keys(changeCameraKeys).includes(keyCode.toString())) {
      this.changeCamera(changeCameraKeys[keyCode]);
    }

    if (Object.keys(changeCameraTopBottomKeys).includes(keyCode.toString())) {
      this.changeCameraTopBottom(changeCameraTopBottomKeys[keyCode]);
    }

    if (keyCode === ROTATE_KEY_CODE) {
      this.onToggleRotate();
    }
  };

  onToggleRotate = () => {
    this.setState(
      prevState => ({
        toggleRotate: !prevState.toggleRotate
      }),
      () => {
        this.updateTransformControls();
        this.renderScene();
      }
    );
  };

  changeCameraTopBottom(placement: string, quiet: boolean = false) {
    const { onCameraUpdate } = this.props;
    if (!quiet && _.isFunction(onCameraUpdate)) {
      onCameraUpdate("changeCameraTopBottom", {
        placement,
        source: this
      });
    }
    this.resetCamera();
    this.mesh.position.y = 0.25;
    this.mesh.rotation.y = 0;
    this.mesh.rotation.x = meshRotationMatrix[placement].angle;
    this.renderScene();
    this.updateAxesPosition();
  }

  changeCamera(placement: string, quiet: boolean = false) {
    this.resetCamera();
    this.mesh.position.y = 0.25;
    this.mesh.rotation.y = 0;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.rotation.z = meshRotationMatrix[placement].angle;
    this.renderScene();
    this.updateAxesPosition();
    const { onCameraUpdate } = this.props;

    if (!quiet && _.isFunction(onCameraUpdate)) {
      onCameraUpdate("changeCamera", { source: this, placement });
    }
  }

  resetCamera() {
    this.controls.reset();
    this.cameraTarget = new THREE.Vector3(0, -0.25, 0);
    this.camera.position.set(0, 0.15, 4);
    this.transformControl.setMode("rotate");
  }

  animate() {
    this.frameId = window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.updateAxesPosition();
    this.renderScene();
  }

  updateAxesPosition() {
    this.canvasAxesCamera.position.copy(this.camera.position);
    this.canvasAxesCamera.position.sub(this.controls.target);
    this.canvasAxesCamera.position.setLength(CAM_DISTANCE);
    this.canvasAxesCamera.lookAt(this.canvasAxesScene.position);
  }

  stop() {
    // eslint-disable-next-line no-undef
    cancelAnimationFrame(this.frameId);
  }

  start() {
    if (!this.frameId) {
      // eslint-disable-next-line no-undef
      this.frameId = requestAnimationFrame(() => this.animate());
    }
  }

  addShadowedLight(
    x: number,
    y: number,
    z: number,
    color: string | number | THREE.Color | undefined,
    intensity: number | undefined
  ) {
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    const d = 1;

    directionalLight.position.set(x, y, z);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.bias = -0.005;

    this.scene.add(directionalLight);
  }

  updateTransformControls() {
    const { toggleRotate } = this.state;
    this.transformControl.visible = toggleRotate;
    this.transformControl.enabled = toggleRotate;
  }

  initControls() {
    const controls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    controls.rotateSpeed = 2.5;
    controls.zoomSpeed = 10;
    controls.panSpeed = 1.2;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [65, 83, 68];
    controls.minDistance = 2;
    controls.maxDistance = 10;

    this.controls = controls;

    const { onCameraUpdate } = this.props;

    this.controls.addEventListener("change", () => {
      onCameraUpdate("controls", { source: this });
    });

    if (!this.transformControl) {
      const transformControl = new TransformControls(
        this.camera,
        this.renderer.domElement
      );

      this.scene.add(transformControl);
      transformControl.setMode("rotate");

      transformControl.addEventListener("change", () => this.renderScene);
      transformControl.addEventListener("dragging-changed", event => {
        this.controls.enabled = !event.value;
      });

      this.transformControl = transformControl;
    }
  }

  renderGeometry(
    geometry: any | THREE.BufferGeometry | THREE.Geometry | undefined
  ) {
    const material = new THREE.MeshStandardMaterial({
      color: 0x0055ff
    });
    geometry.computeFaceNormals();
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.y = 0.25;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.scale.multiplyScalar(0.001);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);

    this.transformControl.attach(this.mesh);
    this.scene.add(this.transformControl);
    this.updateTransformControls();

    this.loading = false;
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
    this.canvasAxesRenderer.render(this.canvasAxesScene, this.canvasAxesCamera);
  }

  render() {
    const { data } = this.props;
    const { toggleRotate } = this.state;

    if (data !== null && !this.mesh) {
      const loader = new PLYLoader();
      this.renderGeometry(loader.parse(data));
    }

    return (
      <div className="mesh-canvas-wrapper">
        <div>
          <Dimmer active={this.loading}>
            <Loader size="medium">Ładowanie...</Loader>
          </Dimmer>
          <div
            style={{ width: "100%", height: "700px" }}
            ref={canvas => {
              this.canvas = canvas;
            }}
          />
          <div
            className="mesh-axes-helper"
            style={{ width: "100px", height: "100px" }}
            ref={canvas => {
              this.canvasAxes = canvas;
            }}
          />

          <div className="button-group-wrapper">
            <Button.Group compact size="small">
              <Button title="1" onClick={() => this.changeCamera("left")}>
                Lewa
              </Button>
              <Button title="2" onClick={() => this.changeCamera("right")}>
                Prawa
              </Button>
              <Button title="3" onClick={() => this.changeCamera("front")}>
                Przód
              </Button>
              <Button title="4" onClick={() => this.changeCamera("back")}>
                Tył
              </Button>
              <Button
                title="5"
                onClick={() => this.changeCameraTopBottom("top")}
              >
                Góra
              </Button>
              <Button
                title="6"
                onClick={() => this.changeCameraTopBottom("bottom")}
              >
                Dół
              </Button>
            </Button.Group>{" "}
            <Button.Group compact size="small" labeled icon>
              <Button
                title="o"
                icon="sync"
                content="Obracaj"
                onClick={() => this.onToggleRotate()}
                primary={toggleRotate}
              />
            </Button.Group>
          </div>
        </div>
      </div>
    );
  }
}

export default MeshViewer;
