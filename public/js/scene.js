    
    import { cameraHelper } from "./camera.js";

    export const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f1f1f1');
    scene.add(cameraHelper);
    //scene.add(new THREE.GridHelper(100,50));

