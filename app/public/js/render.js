import {resizeRendererToDisplaySize}  from"./renderer.js"
import {setScissorForElement} from"./renderer.js"
import {renderer} from"./renderer.js"
import { view1Elem } from "./controls.js";
import {camera,cameraHelper} from "./camera.js"
import { scene } from "./scene.js";
import { spotLight } from "./lights.js";
import { water } from "./controls.js";
function fix(){
   resizeRendererToDisplaySize(renderer);
    // turn on the scissor
    renderer.setScissorTest(true);
    renderer.setPixelRatio(window.devicePixelRatio);
    // render the original view
    {
      const aspect = setScissorForElement(view1Elem);

      // adjust the camera for this aspect
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      cameraHelper.update();

      // don't draw the camera helper in the original view
      cameraHelper.visible = false;

      //scene.background.set('#f1f1f1');
      
      // render
      
      renderer.render(scene, camera);
}
}

export function anime(){
    // render from the 2nd camera
    
    window.requestAnimationFrame(render);
    
  }

let start;
start=performance.now();
export function render() {
 fix();

anime();
 /*spotLight.position.set(

      camera.position.x +10,
      camera.position.y +10,
      camera.position.z +10,

    )   */
    if(water!=null) water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
 }
anime();


 let timelaplse=performance.now()-start;
console.log(timelaplse);

