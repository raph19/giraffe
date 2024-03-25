import { scene } from "./scene.js";
import { render} from "./render.js";
import { uploaded_image,transformControls,obj,imgname } from "./controls.js";
export var objects = [];
import { renderer } from "./renderer.js";
import { EmojiPicker } from "./Emoji.js";
import { VRButton } from './VRbutton.js';
import { ARButton } from './ARbutton.js';
import { XRControllerModelFactory } from "https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/webxr/XRControllerModelFactory.min.js";
import{camera} from'./camera.js';
import { addocean } from "./controls.js";
import {lnt,all_saved_projects, MergedMeshes2, isMerged} from"./imp-exp.js";
import {howmany,mergedMeshes2,isMerged2, fetchDataAndInitialize,fetchbigDataAndInitialize ,checkthewildcards2,nestedscenelength,nestedsceneobj,scnchldrn2,scnobjs2,originalIndividualMeshes,undoMerge,take,howmanymergedbtns,integerValue,integerValue2,filenameMerged,filenameMerged2,originalIndividualMeshes2,splitMergedMesh2,array_of_arrays,array_of_arrays2,cnT_gltf_merged} from "./imp-exp.js";
import {_GLTFExporter} from "./three-gltf-exporter/index.js";
import { GLTFLoader } from "./GLTFLoader.js";
export var checkifthereismodel;
export var fixoffsetwhenload2=0;
export var exec=false;



document.getElementById("image").addEventListener("click", function() {
  if (document.getElementById("image-input").style.display === "none") {
      document.getElementById("image-input").style.display = "inline-grid";document.getElementById("model-input").style.display = "none";
  }else{
    scene.remove(transformControls);if(uploaded_image!=null){checkifthereismodel_tuc();splitwhenload();scnchldrn2();scnobjs2();createImage();checkthewildcards();if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible"}else{document.getElementById("image-input").style.display="inline-grid";}
  }
});
document.getElementById("model").addEventListener("click", function(event) {
  if (document.getElementById("model-input").style.display === "none") {
    exec=true;
    document.getElementById("model-input").style.display = "inline-grid";document.getElementById("image-input").style.display="none";
  }else{
    document.getElementById("model-input").style.display = "inline-grid"
    document.getElementById("image-input").style.display="none";scene.remove(transformControls);
    exec=false;
  }
});


// Get the button, and when the user clicks on it, execute myFunction
/*
export const canvas1 = document.querySelector('#c');

export const renderer2 = new THREE.WebGLRenderer({canvas1, antialias:true,    preserveDrawingBuffer: true
})
*/
/*
export const canvas2 = document.querySelector('#c');

export const renderer3 = new THREE.WebGLRenderer({canvas2, antialias:true,    preserveDrawingBuffer: true
})
*/

/*renderer.xr.enabled = true;
renderer.setAnimationLoop(render);
const but=ARButton.createButton(renderer);
document.body.appendChild(but);
*/

/*const but2=VRButton.createButton(renderer2);
renderer2.xr.enabled = true;
renderer2.setAnimationLoop(function(){
  
  renderer2.render(scene,camera)
});

document.body.appendChild(but2);
*/////////////////////////////////////////////////////////////////////////////////
/*
var cameraVector = new THREE.Vector3(); // create once and reuse it!
const prevGamePads = new Map();
var speedFactor = [0.1, 0.1, 0.1, 0.1];
var intersected = [];
var tempMatrix = new THREE.Matrix4();
var controllerGrip1, controllerGrip2;
var group;
group = new THREE.Group();
scene.add(group);
renderer2.shadowMap.enabled = true;
 //the following increases the resolution on Quest
 renderer2.xr.setFramebufferScaleFactor(2.0);
 document.body.appendChild(VRButton.createButton(renderer2));
 //////////////////////////////////AR////////////////////////////////
 async function activateXR() {
  // Add a canvas element and initialize a WebGL context that is compatible with WebXR.

  const gl = canvas2.getContext("webgl", {xrCompatible: true});

// Set up the WebGLRenderer, which handles rendering to the session's base layer.
const renderer3 = new THREE.WebGLRenderer({
  alpha: true,
  preserveDrawingBuffer: true,
  canvas: canvas2,
  context: gl
});
renderer3.autoClear = false;

// The API directly updates the camera matrices.
// Disable matrix auto updates so three.js doesn't attempt
// to handle the matrices independently.
const camera = new THREE.PerspectiveCamera();
camera.matrixAutoUpdate = false;

// Initialize a WebXR session using "immersive-ar".
const session = await navigator.xr.requestSession("immersive-ar");
session.updateRenderState({
  baseLayer: new XRWebGLLayer(session, gl)
});

// A 'local' reference space has a native origin that is located
// near the viewer's position at the time the session was created.
const referenceSpace = await session.requestReferenceSpace('local');

// Create a render loop that allows us to draw on the AR view.
const onXRFrame = (time, frame) => {
  // Queue up the next draw request.
  session.requestAnimationFrame(onXRFrame);

  // Bind the graphics framebuffer to the baseLayer's framebuffer
  gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer)

  // Retrieve the pose of the device.
  // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
  const pose = frame.getViewerPose(referenceSpace);
  if (pose) {
    // In mobile AR, we only have one view.
    const view = pose.views[0];

    const viewport = session.renderState.baseLayer.getViewport(view);
    renderer3.setSize(viewport.width, viewport.height)

    // Use the view's transform matrix and projection matrix to configure the THREE.camera.
    camera.matrix.fromArray(view.transform.matrix)
    camera.projectionMatrix.fromArray(view.projectionMatrix);
    camera.updateMatrixWorld(true);

    // Render the scene with THREE.WebGLRenderer.
    renderer3.render(scene, camera)
  }
}
session.requestAnimationFrame(onXRFrame);

}
 renderer3.xr.enabled = true;

 //renderer3.shadowMap.enabled = true;
 //the following increases the resolution on Quest
 //renderer3.xr.setFramebufferScaleFactor(2.0);
 document.body.appendChild(ARButton.createButton(renderer3));
 document.getElementById("ARButton").onclick= function() {activateXR()};
////////////////////////////////////////////////////////////////////////
 // controllers
 var controller1 = renderer2.xr.getController(0);
 controller1.name="left";    ////MODIFIED, added .name="left"
 controller1.addEventListener("selectstart", onSelectStart);
 controller1.addEventListener("selectend", onSelectEnd);
 scene.add(controller1);

 var controller2 = renderer2.xr.getController(1);
 controller2.name="right";  ////MODIFIED added .name="right"
 controller2.addEventListener("selectstart", onSelectStart);
 controller2.addEventListener("selectend", onSelectEnd);
 scene.add(controller2);

 var controllerModelFactory = new XRControllerModelFactory();

 controllerGrip1 = renderer2.xr.getControllerGrip(0);
 controllerGrip1.add(
     controllerModelFactory.createControllerModel(controllerGrip1)
 );
 scene.add(controllerGrip1);

 controllerGrip2 = renderer2.xr.getControllerGrip(1);
 controllerGrip2.add(
     controllerModelFactory.createControllerModel(controllerGrip2)
 );
 scene.add(controllerGrip2);
   //Raycaster Geometry
   var geometry2 = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -1)
]);

 var line = new THREE.Line(geometry2);
 line.name = "line";
 line.scale.z = 50;   //MODIFIED FOR LARGER SCENE

 controller1.add(line.clone());
 controller2.add(line.clone());

 var raycaster1 = new THREE.Raycaster();

 ////////////////////////////////////////
 //// MODIFICATIONS FROM THREEJS EXAMPLE
 //// create group named 'dolly' and add camera and controllers to it
 //// will move dolly to move camera and controllers in webXR

 var dolly = new THREE.Group();
 dolly.position.set(0, 0, 0);
 dolly.name = "dolly";
 scene.add(dolly);
 dolly.add(camera);
 dolly.add(controller1);
 dolly.add(controller2);
 dolly.add(controllerGrip1);
 dolly.add(controllerGrip2);

 ////
 ///////////////////////////////////
 //renderer2.setSize(window.innerWidth, window.innerHeight);

 window.addEventListener("resize", onWindowResize, false);
 renderer3.setSize(window.innerWidth, window.innerHeight);
*/
/*

function onWindowResize() {
 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();
 renderer2.setSize(window.innerWidth, window.innerHeight);
}
*/
/*
function onSelectStart(event) {
 var controller = event.target;

 var intersections = getIntersections(controller);

 if (intersections.length > 0) {
     var intersection = intersections[0];
     var object = intersection.object;
     object.material.emissive.b = 1;
     controller.attach(object);
     controller.userData.selected = object;
 }
}

function onSelectEnd(event) {
 var controller = event.target;
 if (controller.userData.selected !== undefined) {
     var object = controller.userData.selected;
     //object.material.emissive.b = 0;     

     group.attach(object);
     controller.userData.selected = undefined;
 }
}

function getIntersections(controller) {
 tempMatrix.identity().extractRotation(controller.matrixWorld);
 raycaster1.ray.origin.setFromMatrixPosition(controller.matrixWorld);
 raycaster1.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
 return raycaster1.intersectObjects(group.children);
}

function intersectObjects(controller) {
 // Do not highlight when already selected

 if (controller.userData.selected !== undefined) return;

 var line = controller.getObjectByName("line");
 var intersections = getIntersections(controller);

 if (intersections.length > 0) {
     var intersection = intersections[0];

     ////////////////////////////////////////
     //// MODIFICATIONS FROM THREEJS EXAMPLE
     //// check if in webXR session
     //// if so, provide haptic feedback to the controller that raycasted onto object
     //// (only if haptic actuator is available)
     const session = renderer2.xr.getSession();
     if (session) {  //only if we are in a webXR session
         for (const sourceXR of session.inputSources) {

             if (!sourceXR.gamepad) continue;
             if (
                 sourceXR &&
                 sourceXR.gamepad &&
                 sourceXR.gamepad.hapticActuators &&
                 sourceXR.gamepad.hapticActuators[0] &&
                 sourceXR.handedness == controller.name              
             ) {
                 var didPulse = sourceXR.gamepad.hapticActuators[0].pulse(0.8, 100);
             }
         }
     }
     ////
     ////////////////////////////////

     var object = intersection.object;
     object.material.emissive.r = 1;
     intersected.push(object);

     line.scale.z = intersection.distance;
 } else {
     line.scale.z = 50;   //MODIFIED AS OUR SCENE IS LARGER
 }
}

function cleanIntersected() {
 while (intersected.length) {
     var object = intersected.pop();
     object.material.emissive.r = 0;
 }
}

  renderer2.setAnimationLoop(function(){
  cleanIntersected();

 intersectObjects(controller1);
 intersectObjects(controller2);

 ////////////////////////////////////////
 //// MODIFICATIONS FROM THREEJS EXAMPLE

 //add gamepad polling for webxr to renderloop
 dollyMove();
    renderer2.render(scene,camera)
  });
 renderer3.setAnimationLoop(function(){

    renderer3.render(scene,camera)
  });
////////////////////////////////////////
//// MODIFICATIONS FROM THREEJS EXAMPLE
//// New dollyMove() function
//// this function polls gamepad and keeps track of its state changes to create 'events'

function dollyMove() {
 var handedness = "unknown";

 //determine if we are in an xr session
 const session = renderer2.xr.getSession();
 let i = 0;

 if (session) {
     let xrCamera = renderer2.xr.getCamera(camera);
     xrCamera.getWorldDirection(cameraVector);

     //a check to prevent console errors if only one input source
     if (isIterable(session.inputSources)) {
         for (const source of session.inputSources) {
             if (source && source.handedness) {
                 handedness = source.handedness; //left or right controllers
             }
             if (!source.gamepad) continue;
             const controller = renderer2.xr.getController(i++);
             const old = prevGamePads.get(source);
             const data = {
                 handedness: handedness,
                 buttons: source.gamepad.buttons.map((b) => b.value),
                 axes: source.gamepad.axes.slice(0)
             };
             if (old) {
                 data.buttons.forEach((value, i) => {
                     //handlers for buttons
                     if (value !== old.buttons[i] || Math.abs(value) > 0.8) {
                         //check if it is 'all the way pushed'
                         if (value === 1) {
                             //console.log("Button" + i + "Down");
                             if (data.handedness == "left") {
                                 //console.log("Left Paddle Down");
                                 if (i == 1) {
                                     dolly.rotateY(-THREE.Math.degToRad(1));
                                 }
                                 if (i == 3) {
                                     //reset teleport to home position
                                     dolly.position.x = 0;
                                     dolly.position.y = 5;
                                     dolly.position.z = 0;
                                 }
                             } else {
                                 //console.log("Right Paddle Down");
                                 if (i == 1) {
                                     dolly.rotateY(THREE.Math.degToRad(1));
                                 }
                             }
                         } else {
                             // console.log("Button" + i + "Up");

                             if (i == 1) {
                                 //use the paddle buttons to rotate
                                 if (data.handedness == "left") {
                                     //console.log("Left Paddle Down");
                                     dolly.rotateY(-THREE.Math.degToRad(Math.abs(value)));
                                 } else {
                                     //console.log("Right Paddle Down");
                                     dolly.rotateY(THREE.Math.degToRad(Math.abs(value)));
                                 }
                             }
                         }
                     }
                 });
                 data.axes.forEach((value, i) => {
                     //handlers for thumbsticks
                     //if thumbstick axis has moved beyond the minimum threshold from center, windows mixed reality seems to wander up to about .17 with no input
                     if (Math.abs(value) > 0.2) {
                         //set the speedFactor per axis, with acceleration when holding above threshold, up to a max speed
                         speedFactor[i] > 1 ? (speedFactor[i] = 1) : (speedFactor[i] *= 1.001);
                         console.log(value, speedFactor[i], i);
                         if (i == 2) {
                             //left and right axis on thumbsticks
                             if (data.handedness == "left") {
                                 // (data.axes[2] > 0) ? console.log('left on left thumbstick') : console.log('right on left thumbstick')

                                 //move our dolly
                                 //we reverse the vectors 90degrees so we can do straffing side to side movement
                                 dolly.position.x -= cameraVector.z * speedFactor[i] * data.axes[2];
                                 dolly.position.z += cameraVector.x * speedFactor[i] * data.axes[2];

                                 //provide haptic feedback if available in browser
                                 if (
                                     source.gamepad.hapticActuators &&
                                     source.gamepad.hapticActuators[0]
                                 ) {
                                     var pulseStrength = Math.abs(data.axes[2]) + Math.abs(data.axes[3]);
                                     if (pulseStrength > 0.75) {
                                         pulseStrength = 0.75;
                                     }

                                     var didPulse = source.gamepad.hapticActuators[0].pulse(
                                         pulseStrength,
                                         100
                                     );
                                 }
                             } else {
                                 // (data.axes[2] > 0) ? console.log('left on right thumbstick') : console.log('right on right thumbstick')
                                 dolly.rotateY(-THREE.Math.degToRad(data.axes[2]));
                             }
                             controls.update();
                         }

                         if (i == 3) {
                             //up and down axis on thumbsticks
                             if (data.handedness == "left") {
                                 // (data.axes[3] > 0) ? console.log('up on left thumbstick') : console.log('down on left thumbstick')
                                 dolly.position.y -= speedFactor[i] * data.axes[3];
                                 //provide haptic feedback if available in browser
                                 if (
                                     source.gamepad.hapticActuators &&
                                     source.gamepad.hapticActuators[0]
                                 ) {
                                     var pulseStrength = Math.abs(data.axes[3]);
                                     if (pulseStrength > 0.75) {
                                         pulseStrength = 0.75;
                                     }
                                     var didPulse = source.gamepad.hapticActuators[0].pulse(
                                         pulseStrength,
                                         100
                                     );
                                 }
                             } else {
                                 // (data.axes[3] > 0) ? console.log('up on right thumbstick') : console.log('down on right thumbstick')
                                 dolly.position.x -= cameraVector.x * speedFactor[i] * data.axes[3];
                                 dolly.position.z -= cameraVector.z * speedFactor[i] * data.axes[3];

                                 //provide haptic feedback if available in browser
                                 if (
                                     source.gamepad.hapticActuators &&
                                     source.gamepad.hapticActuators[0]
                                 ) {
                                     var pulseStrength = Math.abs(data.axes[2]) + Math.abs(data.axes[3]);
                                     if (pulseStrength > 0.75) {
                                         pulseStrength = 0.75;
                                     }
                                     var didPulse = source.gamepad.hapticActuators[0].pulse(
                                         pulseStrength,
                                         100
                                     );
                                 }
                             }
                             controls.update();
                         }
                     } else {
                         //axis below threshold - reset the speedFactor if it is greater than zero  or 0.025 but below our threshold
                         if (Math.abs(value) > 0.025) {
                             speedFactor[i] = 0.025;
                         }
                     }
                 });
             }
             ///store this frames data to compate with in the next frame
             prevGamePads.set(source, data);
         }
     }
 }
}

function isIterable(obj) {  //function to check if object is iterable
 // checks for null and undefined
 if (obj == null) {
     return false;
 }
 return typeof obj[Symbol.iterator] === "function";
}
*/
////////////////////////////////////////

////////////////////////////////////////




/////////////////////////////////////
if (document.getElementById("bottom_box") != null){
  document.getElementById("share").style.visibility="visible";
  document.getElementById("share").style.top = "64%";
  document.getElementById("share").style.left = "7.57%";
}else{
  if (document.getElementById("share") != null){
  document.getElementById("share").style.visibility="visible";
  }
}
/////////////////////////////////////////////////////////////////////////////////
document.getElementById("myBtn").onclick = function() {myFunction();document.getElementById("model-input").style.display = "none";
document.getElementById("image-input").style.display="none";};
document.getElementById("myBtn1").onclick = function() {myFunction1();document.getElementById("model-input").style.display = "none";
document.getElementById("image-input").style.display="none";};//document.getElementById("model-input").style.display="none";document.getElementById("image-input").style.display="none"
document.getElementById("myBtn2").onclick = function() {myFunction2();document.getElementById("model-input").style.display = "none";
document.getElementById("image-input").style.display="none";};
document.getElementById("myBtn3").onclick = function() {myFunction8();document.getElementById("model-input").style.display = "none";
document.getElementById("image-input").style.display="none";};

document.getElementById("cube").onclick = function() {checkifthereismodel_tuc();splitwhenload();scnchldrn2();scnobjs2();createCube();checkthewildcards();if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible"};
document.getElementById("sphere").onclick = function() {checkifthereismodel_tuc();splitwhenload();scnchldrn2();scnobjs2();createSphere();checkthewildcards();if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible"};
document.getElementById("tetrahedron").onclick = function() {checkifthereismodel_tuc();splitwhenload();scnchldrn2();scnobjs2();createTetrahedron();checkthewildcards();if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible"};
document.getElementById("cylinder").onclick = function() {checkifthereismodel_tuc();splitwhenload();scnchldrn2();scnobjs2();createCylinder();checkthewildcards();if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible"};
//document.getElementById("image").onclick = function() {document.getElementById("model-input").style.display="none";scene.remove(transformControls);if(uploaded_image!=null){checkifthereismodel_tuc();splitwhenload();scnchldrn2();scnobjs2();createImage();if(document.getElementById("clear-button").style.visibility="hidden")document.getElementById("clear-button").style.visibility="visible"}else{document.getElementById("image-input").style.display="inline-grid";}};
//document.getElementById("model").onclick = function() {document.getElementById("model-input").style.display="inline-grid";document.getElementById("image-input").style.display="none";scene.remove(transformControls);};
document.getElementById("texture").onclick = function() {document.getElementById("texture-input").style.display="grid";};

document.getElementById("ocean").onclick = function() {checkifthereismodel_tuc();splitwhenload();scnchldrn2();scnobjs2();addocean()};


document.getElementById("moon").onclick = function() {darkmode()};
if(document.getElementById("close_ex")!=null){
document.getElementById("close_ex").onclick = function() {document.getElementById("box").style.visibility="hidden"};
}
document.getElementById("pop").onclick = function() {myFunction3()};
document.getElementById("pop1").onclick = function() {myFunction4();elm.focus(); transformControls.detach(obj);};
if(document.getElementById("pop2")!=null){
document.getElementById("pop2").onclick = function() {myFunction5();elm2.focus();transformControls.detach(obj);};
}
if(document.getElementById("pop3")!=null){

document.getElementById("pop3").onclick = function() {myFunction6();elm3.focus();transformControls.detach(obj);};
}
document.getElementById("myPopup").onclick=function(){myFunction3();};
document.getElementById("myPopup1").onclick=function(){myFunction4();};
if(document.getElementById("myPopup2")!=null){

document.getElementById("myPopup2").onclick=function(){myFunction5();};
}
if(document.getElementById("myPopup3")!=null){

document.getElementById("myPopup3").onclick=function(){myFunction6();};
}
if(document.getElementById("share")!=null){

document.getElementById("share").onclick=function(){transformControls.detach(obj);
  sharefunc();if (document.getElementById("box").style.visibility="hidden"){document.getElementById("box").style.visibility="visible"}};
}
if(document.getElementById("save_button4")!=null){

  document.getElementById("save_button4").onclick=function(){document.getElementById("box").style.visibility="hidden"};
}
  document.getElementById("clear-button").onclick = function() {clearScene();};

var jr=document.getElementById("join_room");
if(jr!=null){
document.getElementById("join_room").onclick=function(){myFunction7();};
}

new EmojiPicker({
  trigger:[{
    insertInto:['#form4'],
    selector:['#emoji_btn']
  }],
  closeButton:true
})

const elm = document.getElementById('form');
const elm2 = document.getElementById('form2');
const elm3 = document.getElementById('form3');

// the "initial" listener subscription prevents execution of ...
elm.addEventListener('focus', evt =>
  evt.stopImmediatePropagation()
);

// ... other handler functionality which got registered later.
elm.addEventListener('focus', evt =>
  console.log(
    `input element focused, event.type: "${ evt.type }"`
  )
);
if(elm2!=null){

elm2.addEventListener('focus', evt =>
  evt.stopImmediatePropagation()
);
// ... other handler functionality which got registered later.
elm2.addEventListener('focus', evt =>
  console.log(
    `input element focused, event.type: "${ evt.type }"`
  )
);
  }
if (document.getElementById("save_button") !== null && typeof document.getElementById("save_button") !== 'undefined') {
  document.getElementById("save_button").onclick = function() {
      myFunction4();
  };
}else{
  document.getElementById("save_button_teams").onclick = function() {
    myFunction4();
};
}
if (document.getElementById("save_button2") !== null && typeof document.getElementById("save_button2") !== 'undefined') {

document.getElementById("save_button2").onclick=function(){myFunction5();};
}
if (document.getElementById("save_button3") !== null && typeof document.getElementById("save_button3") !== 'undefined') {

document.getElementById("save_button3").onclick=function(){myFunction6();};
}
if (document.getElementById("more") !== null && typeof document.getElementById("more") !== 'undefined') {
  document.getElementById("more").onclick = function() {
    myFunction3();  };
}else{
  document.getElementById("more_teams").onclick = function() {
    myFunction3();};
}


//document.getElementById("myPopup1").onclick =function() {if(document.getElementsByClassName("show4").length>0){document.getElementById("myPopup1").style.visibility="visible";}};
/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
const planeWidth = 10;
const planeHeight = 10;

export const geometry = new THREE.PlaneBufferGeometry(planeWidth, planeHeight);

const loader = new THREE.TextureLoader();

function darkmode(){
  document.body.classList.toggle("night_mode");
  if( document.getElementsByClassName("night_mode").length > 0 ) {
    document.body.style.transition="1s";
  }
}   

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
 if( document.getElementsByClassName("show1").length > 0) {
  document.getElementById("myDropdown1").classList.toggle("show1");
  }if(document.getElementsByClassName("show2").length > 0){
    document.getElementById("myDropdown2").classList.toggle("show2");  
  }if(document.getElementsByClassName("show8").length > 0){
    document.getElementById("myDropdown3").classList.toggle("show8");   
  }
}
  function myFunction1() {
    document.getElementById("myDropdown1").classList.toggle("show1");
    if( document.getElementsByClassName("show").length > 0) {
      document.getElementById("myDropdown").classList.toggle("show");
      }if(document.getElementsByClassName("show2").length > 0){
        document.getElementById("myDropdown2").classList.toggle("show2");  
      }if(document.getElementsByClassName("show8").length > 0){
        document.getElementById("myDropdown3").classList.toggle("show8");   
      }
    }

    function myFunction2() {
      document.getElementById("myDropdown2").classList.toggle("show2");  
      if( document.getElementsByClassName("show1").length > 0) {
        document.getElementById("myDropdown1").classList.toggle("show1");
        }if(document.getElementsByClassName("show").length > 0){
          document.getElementById("myDropdown").classList.toggle("show");  
        }if(document.getElementsByClassName("show8").length > 0){
          document.getElementById("myDropdown3").classList.toggle("show8");   
        }
      }

      function myFunction8() {
        document.getElementById("myDropdown3").classList.toggle("show8");  
        if( document.getElementsByClassName("show1").length > 0) {
          document.getElementById("myDropdown1").classList.toggle("show1");
          }if(document.getElementsByClassName("show").length > 0){
            document.getElementById("myDropdown").classList.toggle("show");  
          }if( document.getElementsByClassName("show2").length > 0) {
            document.getElementById("myDropdown2").classList.toggle("show2");
        }
      }
      ////////load pop up////////
      function myFunction3() {
                document.getElementById("myPopup").classList.toggle("show3");
                if(document.getElementsByClassName("show4").length>0){
                  document.getElementById("myPopup1").classList.toggle("show4");
                }if(document.getElementsByClassName("show5").length>0)
                {
                  document.getElementById("myPopup2").classList.toggle("show5");
                }if(document.getElementsByClassName("show6").length>0){
                  document.getElementById("myPopup3").classList.toggle("show6");
                }if(document.getElementsByClassName("show7").length>0){
                  document.getElementById("teamstocolaborate").classList.toggle("show7");
                }if(document.getElementsByClassName("show10").length>0){
                  document.getElementById("team_name-error").classList.toggle("show10");
                }if(document.getElementsByClassName("show9").length>0){
                  document.getElementById("project_name-error").classList.toggle("show9");
                }
      }
      ////////////////////////////

      function myFunction4() {
        document.getElementById("myPopup1").classList.toggle("show4");
        if(document.getElementById("project_name-error")!=null){
        document.getElementById("project_name-error").classList.toggle("show9");
        }
        if(document.getElementsByClassName("show3").length>0){
          document.getElementById("myPopup").classList.toggle("show3");
        }if(document.getElementsByClassName("show5").length>0)
        {
          document.getElementById("myPopup2").classList.toggle("show5");
        }if(document.getElementsByClassName("show6").length>0){
          document.getElementById("myPopup3").classList.toggle("show6");
        }if(document.getElementsByClassName("show7").length>0){
          document.getElementById("teamstocolaborate").classList.toggle("show7");
        }       if(document.getElementsByClassName("show10").length>0){
          document.getElementById("team_name-error").classList.toggle("show10");
        }
}
function myFunction5() {
  document.getElementById("myPopup2").classList.toggle("show5");
  document.getElementById("team_name-error").classList.toggle("show10");

  if(document.getElementsByClassName("show3").length>0){
    document.getElementById("myPopup").classList.toggle("show3");
  }if(document.getElementsByClassName("show4").length>0){
    document.getElementById("myPopup1").classList.toggle("show4");
  }if(document.getElementsByClassName("show6").length>0){
    document.getElementById("myPopup3").classList.toggle("show6");
  }if(document.getElementsByClassName("show7").length>0){
    document.getElementById("teamstocolaborate").classList.toggle("show7");
  }if(document.getElementsByClassName("show9").length>0){
    document.getElementById("project_name-error").classList.toggle("show9");
  }

}
function myFunction6() {
  document.getElementById("myPopup3").classList.toggle("show6");
  if(document.getElementsByClassName("show3").length>0){
    document.getElementById("myPopup").classList.toggle("show3");
  }if(document.getElementsByClassName("show4").length>0){
    document.getElementById("myPopup1").classList.toggle("show4");
  }if(document.getElementsByClassName("show5").length>0){
    document.getElementById("myPopup2").classList.toggle("show5");
  }if(document.getElementsByClassName("show7").length>0){
    document.getElementById("teamstocolaborate").classList.toggle("show7");
  }if(document.getElementsByClassName("show10").length>0){
    document.getElementById("team_name-error").classList.toggle("show10");
  }if(document.getElementsByClassName("show9").length>0){
    document.getElementById("project_name-error").classList.toggle("show9");
  }

}

export function myFunction7() {
  document.getElementById("teamstocolaborate").classList.toggle("show7");
  if(document.getElementsByClassName("show3").length>0){
    document.getElementById("myPopup").classList.toggle("show3");
  }if(document.getElementsByClassName("show4").length>0){
    document.getElementById("myPopup1").classList.toggle("show4");
  }if(document.getElementsByClassName("show5").length>0){
    document.getElementById("myPopup2").classList.toggle("show5");
  }if(document.getElementsByClassName("show6").length>0){
    document.getElementById("myPopup3").classList.toggle("show6");
  }if(document.getElementsByClassName("show10").length>0){
    document.getElementById("team_name-error").classList.toggle("show10");
  }if(document.getElementsByClassName("show9").length>0){
    document.getElementById("project_name-error").classList.toggle("show9");
  }
}


export var editable;
export var counter_cube=0;
export var counter_sphere=0;
export var counter_cylinder=0;
export var counter_tetrahedron=0;
export var counter_img=0;

 function createCube()
{counter_cube += 1;
  const cubeSize = 2;
  const object = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshStandardMaterial({color: '#ffffff',side: THREE.DoubleSide});
  const cube = new THREE.Mesh(object, cubeMat);
  cube.position.set(cubeSize + 1, cubeSize / 2, 0);
  cube.castShadow=true;
  cube.receiveShadow=true;
  objects.push(cube);
  scene.add(cube);
  cube.userData.editable =true;
  cube.userData.name = 'cube'+ counter_cube;
  scene.remove(transformControls);
  //group.add(cube);
  if(checkifthereismodel===false){
  //if(lnt!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+lnt+nestedscenelength);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength);
      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+lnt+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].userData.name;
    
    }
/*}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
}*/
}else{
  //if(lnt!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength);
      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].userData.name;
    
    }
/*}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
}*/
}
}
 function createTetrahedron()
{counter_tetrahedron+=1;
  const radius = 4;
  const object = new THREE.TetrahedronBufferGeometry(radius);
  const tetra = new THREE.MeshStandardMaterial({color: '#ffffff',side:THREE.DoubleSide});
  const mesh = new THREE.Mesh(object, tetra);
  mesh.position.set(radius + 6, 2, 0);
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  objects.push(mesh)
  scene.add(mesh);
  //group.add(mesh);

  mesh.userData.editable =true;
  mesh.userData.name = 'Tetrahedron'+counter_tetrahedron;
  scene.remove(transformControls);
  if(checkifthereismodel===false){

  //if(lnt!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+lnt+nestedscenelength);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength);
      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+lnt+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].userData.name;
    
    }
/*}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+nestedscenelength+nestedsceneobj);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength+nestedsceneobj);
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+nestedscenelength+nestedsceneobj);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+nestedscenelength+nestedsceneobj).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
}*/
}else{
 // if(lnt!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength);
      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].userData.name;
    
    }
/*}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+howmanymergedbtns);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+howmanymergedbtns);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+howmanymergedbtns).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
}*/
}
} function createSphere()
{counter_sphere+=1;
  const sphereRadius = 1;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const object = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
  const sphereMat = new THREE.MeshStandardMaterial({color: '#ffffff',side:THREE.DoubleSide});
  const sphere = new THREE.Mesh(object, sphereMat);
  sphere.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
  sphere.castShadow=true;
  sphere.receiveShadow=true;
  objects.push(sphere);
  scene.add(sphere);
  sphere.userData.editable =true;
  sphere.userData.name = 'sphere'+counter_sphere;
  //group.add(sphere);
  scene.remove(transformControls);
  if(checkifthereismodel===false){

  //if(lnt!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+lnt+nestedscenelength);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength);
      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+lnt+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].userData.name;
    
    }
/*}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+nestedscenelength+nestedsceneobj);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength+nestedsceneobj);
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+nestedscenelength+nestedsceneobj);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+nestedscenelength+nestedsceneobj).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
}*/
}else{
  //if(lnt!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength);
      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].userData.name;
    
    }
/*}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+howmanymergedbtns);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+howmanymergedbtns);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+howmanymergedbtns).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
}*/
}
}
function createCylinder()
{counter_cylinder+=1;
const object = new THREE.CylinderBufferGeometry( 2, 2, 4, 64);
const cylindermat = new THREE.MeshStandardMaterial( {color: '#ffffff',side:THREE.DoubleSide} );
const cylinder = new THREE.Mesh( object, cylindermat );
cylinder.position.set(-8, 2, 0);
cylinder.castShadow=true;
cylinder.receiveShadow=true;
objects.push(cylinder);
scene.add(cylinder);
cylinder.userData.editable =true;
cylinder.userData.name = 'cylinder'+counter_cylinder;
scene.remove(transformControls);
if(checkifthereismodel===false){

//group.add(cylinder);
//if(lnt!=null){
  if(scene.children[scene.children.length-1]!=null){
  
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+lnt+nestedscenelength);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength);
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+lnt+nestedscenelength);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
/*}else{
if(scene.children[scene.children.length-1]!=null){
  
  const layer = document.createElement("button");
  layer.setAttribute('id', scene.children.length-1+nestedscenelength+nestedsceneobj);
  layer.setAttribute('class', "layer");
  layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength+nestedsceneobj);
  document.body.appendChild(layer);
  const node = document.getElementById(scene.children.length-1+nestedscenelength+nestedsceneobj);
  document.getElementById("layers").appendChild(node);
  document.getElementById(scene.children.length-1+nestedscenelength+nestedsceneobj).innerHTML = scene.children[scene.children.length-1].userData.name;

}
}*/
}else{
 // if(lnt!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength);
      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].userData.name;
    
    }
/*}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+howmanymergedbtns);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+howmanymergedbtns);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+howmanymergedbtns).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
}*/
}
}
export function createImage(){
  counter_img++;
  function makeInstance(geometry, color, rotY, url) {
    const texture = loader.load(url, render);
    const material = new THREE.MeshStandardMaterial({
      color,
      map: texture,
      alphaTest: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    objects.push(mesh)
    mesh.castShadow=true;
    mesh.receiveShadow=true;
    mesh.material.map.anisotropy=16;
    scene.add(mesh);
    mesh.userData.editable =true;
    mesh.userData.name = imgname+counter_img;
    mesh.rotation.y = rotY;
  }
  scene.remove(transformControls);

  makeInstance(geometry, 'white', 0,uploaded_image);  
  if(checkifthereismodel===false){

  //if(lnt!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+lnt+nestedscenelength);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength);
      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+lnt+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].userData.name;
    
    }
/*}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+nestedscenelength+nestedsceneobj);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength+nestedsceneobj);
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+nestedscenelength+nestedsceneobj);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+nestedscenelength+nestedsceneobj).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
}*/
}else{
  //if(lnt!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      layer.setAttribute('class', "layer");
      layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength);
      document.body.appendChild(layer);
      const node = document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength).innerHTML = scene.children[scene.children.length-1].userData.name;
    
    }
/*}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer = document.createElement("button");
    layer.setAttribute('id', scene.children.length-1+howmanymergedbtns);
    layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[scene.children.length-1].id);
    document.body.appendChild(layer);
    const node = document.getElementById(scene.children.length-1+howmanymergedbtns);
    document.getElementById("layers").appendChild(node);
    document.getElementById(scene.children.length-1+howmanymergedbtns).innerHTML = scene.children[scene.children.length-1].userData.name;
  
  }
}*/
}
}function sharefunc(){
  var strMime = "image/jpeg";

  const imgData = renderer.domElement.toDataURL(strMime);
  const imgEl = document.getElementById( 'imgid' ); 
  imgEl.src=imgData;
  box.appendChild(imgEl);
}
///clear scene///
function clearScene() {
  // Remove all objects from the scene
  for(var q=scene.children.length-1;q>=0;q--){       
    if (scene.children[q].type!=='CameraHelper' && scene.children[q].type!=='HemisphereLight' && scene.children[q].type!=='SpotLight' && scene.children[q].type!=='DirectionalLight' && scene.children[q].userData.name!=='Sky'){
        scene.remove(scene.children[q]);
    }
}
const elementToRemove = document.querySelectorAll('.layer');

elementToRemove.forEach(element => {
  element.remove();

});scnchldrn2(); scnobjs2();
counter_cube=0;
counter_sphere=0;
counter_cylinder=0;
counter_tetrahedron=0;
counter_img=0;
objects.splice(0, objects.length); 
transformControls.detach();
document.getElementById("clear-button").style.visibility="hidden";
//localStorage.clear();     
//saveScene();
}
//local_Storage for scene//
// Save the scene to localStorage

// Extract the Base64-encoded data from the URI
/*let file = new File([JSON.stringify(gltf)], "otinanai");
var upmodel = URL.createObjectURL(file);  */



    /*const gltfBlob = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
    socket_editor.emit('savesceneonreload',gltfBlob, (err) => {
        if (err) {
          alert(err);
        }
      });*/
    // Now you can use 'gltfUrl' to download or handle the GLTF data
 // });

      
 // const sceneData = JSON.stringify(scene);
  //localStorage.setItem('savedScene', sceneData);
 // console.log('Scene saved to localStorage');


let loadobjs=[]; var ldobjs=0;
// Retrieve the scene from localStorage
/*function loadScene(){
// Listen for 'storedData' event from the server upon reconnection
socket.on('storedData', (storedData) => {
  console.log('Received stored data from server:', storedData);

});
}*/
 /* const savedScene = localStorage.getItem('savedScene');
  
  if (savedScene) {
    const parsedScene = new THREE.ObjectLoader().parse( JSON.parse( savedScene ) );
    for(var k=parsedScene.children.length-1;k>=0;k--){
      if(parsedScene.children[k].isMesh && parsedScene.children[k].type!=='Object3D'&&parsedScene.children[k].type!=='DirectionalLight'&& parsedScene.children[k].type!=='CameraHelper' && parsedScene.children[k].userData.name!=='Sky' &&parsedScene.children[k].type!=='HemisphereLight' && parsedScene.children[k].type!=='SpotLight')
   {    
    if (!Array.isArray(loadobjs)) {
      loadobjs = [];
    }   
    loadobjs.push(parsedScene.children[k]);
    ldobjs++;
  }
    }
    loadobjs.reverse();
    for(var d=0; d<loadobjs.length;d++){
      scene.add(loadobjs[d]);
      objects.push( loadobjs[d] );

    }
   /* var dds=parsedScene.children[k].id;
    var g=parsedScene.children[k].userData.name;
    names[nms]=g;
    idz[ids]=dds;
    scene.add(parsedScene.children[k]);
    objects.push( scene.children[scene.children.length-1] );

for(var f=5;f<=scene.children.length-1;f++){
    if(all_saved_projects!=null){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer = document.createElement("button");
      layer.setAttribute('id', f+all_saved_projects);
      layer.setAttribute('class', "layer");
    layer.setAttribute("wildcard", scene.children[f].id);
      document.body.appendChild(layer);
      const node = document.getElementById(f+all_saved_projects);
      document.getElementById("layers").appendChild(node);
      document.getElementById(f+all_saved_projects).innerHTML = scene.children[f].userData.name;
    
    }
}else{
  if(scene.children[scene.children.length-1]!=null){
    
    const layer = document.createElement("button");
    layer.setAttribute('id', f);
    layer.setAttribute('class', "layer");
   layer.setAttribute("wildcard", scene.children[f].id);
    document.body.appendChild(layer);
    const node = document.getElementById(f);
    document.getElementById("layers").appendChild(node);
   document.getElementById(f).innerHTML = scene.children[f].userData.name;
  
  }
}
}
    console.log('Scene loaded from localStorage');}
 //  nms++;ids++;
 
if(objects.length>0) document.getElementById("clear-button").style.visibility="visible";


  else {
    console.log('No saved scene found');
  }
};*/

// Automatically save the scene when the page is about to unload
//setInterval(saveScene, 20000);

//window.addEventListener('beforeunload', saveScene);

/*window.onload = function () {
  fetchDataAndInitialize()
  .then(function () {
    // Call your window load function after the data fetching is complete
    fetchbigDataAndInitialize()
    .then(function () {
    loadScene();
    })
  })
  .catch(function (error) {
    console.error('Error initializing:', error);
  });
};*/
// Load the scene when the page is loaded

var counter_wild=0;
var counter_wild2=0;
var counter_wilds=0;

////////check the wildcards////////////
export function checkthewildcards(){
//const dynamicAttribute = 'wildcard';
//const attributeValue = mesh.id; 

// all elements with the attribute "wildcard"
const elementsWithAttribute = document.querySelectorAll('[wildcard]');

// Change the IDs of each element
elementsWithAttribute.forEach(element => {
  if(element.attributes[2].nodeValue==="199"&&counter_wild===0){
    counter_wild++;
  }else if(element.attributes[2].nodeValue==="199"&&counter_wild===1){
    const nodevalue_wild= element.attributes[2].nodeValue;
  const textContent_wild= element.attributes[2].textContent;
  const value_wild= element.attributes[2].value;
  const x = parseInt(value_wild, 10);
  const changed_wild=x+counter_wild

  element.attributes[2].nodeValue=nodevalue_wild-changed_wild
  element.attributes[2].textContent=textContent_wild-changed_wild
  element.attributes[2].value=value_wild+changed_wild
  }else{
    if(counter_wild===0){
    const nodevalue_wild= element.attributes[2].nodeValue;
  const textContent_wild= element.attributes[2].textContent;
  const value_wild= element.attributes[2].value;
  const x = parseInt(value_wild, 10);
  const changed_wild=x+counter_wild2-199;

  element.attributes[2].nodeValue=nodevalue_wild-changed_wild
  element.attributes[2].textContent=textContent_wild-changed_wild
  element.attributes[2].value=value_wild-changed_wild
  }else{
    const nodevalue_wild= element.attributes[2].nodeValue;
  const textContent_wild= element.attributes[2].textContent;
  const value_wild= element.attributes[2].value;
  const x = parseInt(value_wild, 10);
  const changed_wild=x-counter_wild2-counter_wild-199;

  element.attributes[2].nodeValue=nodevalue_wild-changed_wild
  element.attributes[2].textContent=textContent_wild-changed_wild
  element.attributes[2].value=value_wild-changed_wild
        counter_wild2++;
  }

  } counter_wilds++;


});counter_wild=0;counter_wild2=0;var counder=0;
for (var n = 5; n < scene.children.length; n++) { if(checkifthereismodel===false){
  if(scene.children[n].isMesh){
  scene.children[n].userData.layerid = n + 194 + counder; // 199 + (n - 5)
}else if(scene.children[n].type==="Scene"||scene.children[n].type.Group){
  if(scene.children[n].children.length===1){
    scene.children[n].userData.layerid = n + counder +  194; // 199 + (n - 5)
  }else{
    for(var jj=0;jj<scene.children[n].children.length;jj++){
      scene.children[n].children[jj].userData.layerid= n +194+jj
    }
  }counder+=scene.children[n].children.length-1
}
}else{
  if(/*integerValue!== undefined && scene.children[n].userData.layerid>integerValue || integerValue2[integerValue2.length-1]!== undefined &&  scene.children[n].userData.layerid>integerValue2[integerValue2.length-1] ||*/ scene.children[n].userData.layerid===undefined){
  if(scene.children[n].isMesh&&scene.children[n].userData.layerid===undefined){
    scene.children[n].userData.layerid = howmanymergedbtns+n + 194 + counder ; // 199 + (n - 5)
    const elid=n+howmanymergedbtns+nestedscenelength+lnt;
    const currel=document.getElementById(elid);
    currel.setAttribute("wildcard",scene.children[n].userData.layerid);
  }else if(scene.children[n].type==="Scene"||scene.children[n].type.Group){
    if(scene.children[n].children.length===1&&scene.children[n].children[0].userData.layerid===undefined){
      scene.children[n].userData.layerid = howmanymergedbtns+n + 194 + counder ; // 199 + (n - 5)
      const elid=n+howmanymergedbtns+nestedscenelength+lnt;
      const currel=document.getElementById(elid);
      currel.setAttribute("wildcard",scene.children[n].userData.layerid);
    }else if(scene.children[n].children.length>1&&scene.children[n].children[0].userData.layerid===undefined){
      for(var jj=0;jj<scene.children[n].children.length;jj++){
        scene.children[n].children[jj].userData.layerid=  howmanymergedbtns+n + 194 ;+jj
        const elid=n+howmanymergedbtns+nestedscenelength+lnt;
        const currel=document.getElementById(elid);
        currel.setAttribute("wildcard",scene.children[n].children[jj].userData.layerid);
      }
    }counder+=scene.children[n].children.length-1
  }
}/*else{
  if(scene.children[n].isMesh){
    scene.children[n].userData.layerid = n + 194 ; // 199 + (n - 5)
    const elid=n+nestedscenelength+nestedsceneobj+lnt;
    const currel=document.getElementById(elid);
    currel.setAttribute("wildcard",scene.children[n].userData.layerid);
  }else if(scene.children[n].type==="Scene"||scene.children[n].type.Group){
    if(scene.children[n].children.length===1){
      scene.children[n].userData.layerid = n + 194 + counder ; // 199 + (n - 5)
      const elid=n+nestedscenelength+nestedsceneobj+lnt;
      const currel=document.getElementById(elid);
      currel.setAttribute("wildcard",scene.children[n].userData.layerid);
    }else{
      for(var jj=0;jj<scene.children[n].children.length;jj++){
        scene.children[n].children[jj].userData.layerid=  n + 194 +jj
        const elid=n+nestedscenelength+nestedsceneobj+lnt;
        const currel=document.getElementById(elid);
        currel.setAttribute("wildcard",scene.children[n].children[jj].userData.layerid);
      }
    }counder+=scene.children[n].children.length-1
  }
}*/
}

}
counter_wilds=0;
}
export function splitwhenload (){
scene.traverse( function( object) {
  if(object.name===filenameMerged2){
  undoMerge(originalIndividualMeshes);
}else if(filenameMerged.includes(object.name)){
  for(var cntt=0;cntt<array_of_arrays.length;cntt++){
    if(isMerged2[cntt]===true){
      splitMergedMesh2(array_of_arrays2[cntt],cntt);
    }else if(isMerged2[cntt]===false)
    {mergedMeshes2(cntt);fixoffsetwhenload2=1;
      splitMergedMesh2(array_of_arrays2[cntt],cntt); 
      fixoffsetwhenload2=0;
    }
  }
}
  })
}

export function checkifthereismodel_tuc() {
  checkifthereismodel = false; 
      if (howmanymergedbtns>0) {
          checkifthereismodel = true;
          return; 
      }

  return checkifthereismodel; 
}

