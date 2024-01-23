const fov = 50;
const aspect = 2;  // the canvas default
const near = 1;
const far = 30000000;
export var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 10, 20);

export var cameraHelper = new THREE.CameraHelper(camera);

