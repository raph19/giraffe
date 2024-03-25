import {camera} from "./camera.js";
import{render} from "./render.js";
import { canvas,renderer } from "./renderer.js";
import { objects ,counter_cube,counter_sphere,counter_cylinder,counter_tetrahedron,counter_img,checkifthereismodel_tuc,checkifthereismodel, splitwhenload} from "./3dobjects.js";
import { scene } from "./scene.js";
import{UndoManager}from "../js/undo-manager.js";
import { createImage,checkthewildcards } from "./3dobjects.js";
import{Water} from "./Water.js";
import{Sky} from "./Sky.js";
import{GUI} from "./gui.js";
import{check,pos,rot,scl,lnt,checkthewildcards2,checkthewildcards3,nestedscenelength,isMerged,individualMeshes,individualMeshes2,integerValue,mrgbtnsids,mrgbtnswildcararray,integerValue2,howmanymergedbtns,filenameMerged2,chck,array_of_arrays, nestedsceneobj} from"./imp-exp.js";
export var isDragging = false;

export var raycaster = new THREE.Raycaster();
export const mouse = new THREE.Vector2(); //x,y pos of mouseclick
const moveMouse = new THREE.Vector2();
function getCurrentURL () {
  return window.location.href
}
export var matched;
var load_water;
// Example
const roomurl = getCurrentURL()

if(roomurl==='https://giraffe-design-tt8d.onrender.com'){
  load_water='textures/waternormals.jpg';
}else{
  matched = roomurl.match(/([^/]*\/){3}/);
  console.log(matched[0]);
  load_water=`${matched[0]}`+'/textures/waternormals.jpg';
}
export var obj;
export var nowObj;
export var newObj;

var counteraki=0;


var objdata;

var objectdata=[];
var objectdata1=[];
var nowobjectdata=[];
var counter_wilds=0;

export var view1Elem = document.querySelector('#view1');
export const view2Elem = document.querySelector('#view2');

export var controls = new THREE.OrbitControls(camera, view1Elem);
controls.target.set(0, 5, 0);
controls.maxDistance = 900;

controls.update();
export var editorHistory = new UndoManager();
window.addEventListener('mousemove', function(event) {
  if(transformControls!==undefined&&transformControls.children[0].object!==undefined){
  document.getElementById("x").value = transformControls.children[0].object.position.x;
  document.getElementById("y").value = transformControls.children[0].object.position.y;
  document.getElementById("z").value = transformControls.children[0].object.position.z;
  document.getElementById("x_r").value = transformControls.children[0].object.rotation.x;
  document.getElementById("y_r").value = transformControls.children[0].object.rotation.y;
  document.getElementById("z_r").value = transformControls.children[0].object.rotation.z;
  document.getElementById("x_s").value = transformControls.children[0].object.scale.x;
  document.getElementById("y_s").value = transformControls.children[0].object.scale.y;
  document.getElementById("z_s").value = transformControls.children[0].object.scale.z;
  }
  }
);
export var transformControls = new THREE.TransformControls( camera, view1Elem);

/*transformControls.addEventListener( 'dragging-changed', function ( event ) {

  controls.enabled = ! event.value;

} );*/

window.addEventListener('click',  function (event) {
  if (isDragging===false) {

  const rect = renderer.domElement.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  /*if(!togl){  

  mouse.x = (( x / (canvas.clientWidth/2)) *  2 - 1);
  mouse.y = ( y / canvas.clientHeight) * - 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const found = raycaster.intersectObjects(objects);
  if(found.length>0 && found[0].object.userData.editable){

  console.log(found[0].object.userData.name);
  found[0].object.material.color.set( 'green' ); 
  transformControls.attach(found[0].object);
  transformControls.setMode('translate');
  scene.add(transformControls);
}
}else{*/


  mouse.x = ( x / canvas.clientWidth ) *  2 - 1;
  mouse.y = ( y / canvas.clientHeight) * - 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const found = raycaster.intersectObjects(objects);

  if(found.length>0 && found[0].object.userData.editable&&event.target.id==="view1"){
   obj = found[0].object;
  //obj.material.color.set( 'green' ); 

  if (obj.userData.merged !== undefined){
    transformControls.setMode('translate');
  }

  if(obj.userData.intersectionPoint===undefined){
    transformControls.position.set(0, 0, 0);
    transformControls.attach(obj);
    transformControls.setMode('translate');
    scene.add(transformControls);
  }else{
    if(isMerged===false){
      const intersectionPoint = obj.userData.intersectionPoint;
      transformControls.position.copy(intersectionPoint);
    transformControls.attach(obj);
    transformControls.setMode('translate');
    scene.add(transformControls);
    }else{
      scene.traverse( function( object) {
        if(object.name===filenameMerged2){
        transformControls.attach(object);
        const intersectionPoint = object.userData.intersectionPoint;
        transformControls.position.copy(intersectionPoint);
        transformControls.setMode('translate');
      scene.add(transformControls);
        }
      })
    }
  }

if(obj.name!==''&&obj.userData.name===undefined){
  document.getElementById("uuid1").innerHTML = obj.name;}else{ document.getElementById("uuid1").innerHTML = obj.userData.name;}
  document.getElementById("x").value = obj.position.x;
  document.getElementById("y").value = obj.position.y;
  document.getElementById("z").value = obj.position.z;
  document.getElementById("x_r").value = obj.rotation.x;
  document.getElementById("y_r").value = obj.rotation.y;
  document.getElementById("z_r").value = obj.rotation.z;
  document.getElementById("x_s").value = obj.scale.x;
  document.getElementById("y_s").value = obj.scale.y;
  document.getElementById("z_s").value = obj.scale.z;
 /* for(var i=0;i<objectdata.length;i++){
    console.log(objectdata[i]);
  }
if(objectdata.length>1 && objectdata[this.length]!=objectdata[this.length+1])
{
  console.log(objectdata[this.length+1]);
  objdata=getObjectData(obj);
//  }*/
}
  }
  } )
 // Create a mouse vector to store the mouse coordinates
/*var mouse2 = new THREE.Vector2();
var raycaster2 = new THREE.Raycaster();

// Add an event listener to detect mouse movement
document.addEventListener('mousemove', function (event) {

    // Calculate normalized device coordinates
    const rect = renderer.domElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mouse2.x = ( x / canvas.clientWidth ) *  2 - 1;
    mouse2.y = ( y / canvas.clientHeight) * - 2 + 1;
raycaster2.setFromCamera(mouse2, camera);

// Calculate objects intersecting the picking ray
var intersects = raycaster2.intersectObjects(objects);

// If there are intersections, do something with them
if (intersects.length > 0) {
    // Get the intersected object
    var intersectedObject = intersects[0].object;
           intersectedObject.material.emissive.r = 1;
           intersectedObject.material.emissive.g=0.5;
           intersectedObject.material.emissive.b=0;
// Set the opacity
intersectedObject.material.opacity = 0.5; // Set to the desired level of transparency
intersectedObject.material.transparent = true; // Enable transparency
} else {
    // If no intersections, reset the color of all objects
    objects.forEach(function(object) {
        object.material.emissive.r = 0;
        object.material.emissive.g=0;
        object.material.emissive.b=0;
        object.material.opacity = 1;

    });
}
  });*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////control_toolbar//////////////////////////////////////////
  var inX = document.getElementById('x');
  inX.addEventListener('input', function() {
    obj.position.x= inX.value;
});
var inY = document.getElementById('y');
inY.addEventListener('input', function() {
  obj.position.y= inY.value;
});
var inZ = document.getElementById('z');
inZ.addEventListener('input', function() {
  obj.position.z= inZ.value;
});
var inX1 = document.getElementById('x_r');
inX1.addEventListener('input', function() {
  obj.rotation.x= inX1.value;
});
var inY1 = document.getElementById('y_r');
inY1.addEventListener('input', function() {
  obj.rotation.y= inY1.value;
});
var inZ1 = document.getElementById('z_r');
inZ1.addEventListener('input', function() {
  obj.rotation.z= inZ1.value;
});
var inX2 = document.getElementById('x_s');
inX2.addEventListener('input', function() {
  obj.scale.x= inX2.value;
});
var inY2 = document.getElementById('y_s');
inY2.addEventListener('input', function() {
  obj.scale.y= inY2.value;
});
var inZ2 = document.getElementById('z_s');
inZ2.addEventListener('input', function() {
  obj.scale.z= inZ2.value;
});
/////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////undo_redo//////////////////////////////////////////////
var oldObjData = null;
var newObjData = null;

transformControls.addEventListener( 'mouseDown', function(e) {
       oldObjData = getObjectData(obj);
       console.log(oldObjData);
        objectdata.push(oldObjData);

 } );
 transformControls.addEventListener( 'mouseUp', function(e) {
        newObjData = getObjectData(obj);
        console.log(oldObjData)
 objectdata1.push(newObjData);

 } );

 transformControls.addEventListener( 'dragging-changed', function ( e ) {  
  controls.enabled = ! e.value;

          console.log("Dragging changed:", e.value);
          if (e.value === false) { // End dragging
            addHistory(oldObjData, newObjData); // Store undo/redo  
            console.log("4")  
              
              setTimeout(function () {
                  console.log("Raycaster enabled after delay");
                  raycaster.enabled = true; // Re-enable raycaster after a delay
              isDragging = false;}, 100);
          } else {
              isDragging = true;
              console.log("Raycaster disabled during dragging");
              raycaster.enabled = false; // Disable raycaster while dragging

          }
 } );


function getObjectData(obj) {
  var data = {
        uuid: obj.uuid, // !Important, used in addHistory.
        position: ({x: obj.position.x, y: obj.position.y, z: obj.position.z}),
        rotation: ({x: obj.rotation._x, y: obj.rotation._y, z: obj.rotation._z}),
        scale: ({x: obj.scale.x, y: obj.scale.y, z: obj.scale.z}),
       // opacity: Number(obj.userData.opacity),
    };
    return data;
}
export function removeobj()
{

  checkifthereismodel_tuc();
  splitwhenload();
  
  const uuidToRemove = obj.uuid;
  const arraytoremovefrom=obj.userData.catchmergebtn;
  const layeridtochange=obj.userData.layerid;

// Find the index of the object with the specified uuid
const indexToRemove = objects.findIndex(item => item.uuid === uuidToRemove);
const indexToRemove2 = individualMeshes.findIndex(item => item.uuid === uuidToRemove);
if(arraytoremovefrom!==undefined&&array_of_arrays[arraytoremovefrom].length>0){
var indexToRemove3 = array_of_arrays[arraytoremovefrom].findIndex(item => item.uuid === uuidToRemove);
}
// If the object is found, remove it
if (indexToRemove !== -1) {
  objects.splice(indexToRemove, 1);
}
// If the object is found, remove it
if (indexToRemove2 !== -1) {
  objects.splice(indexToRemove2, 1);
}
// If the object is found, remove it
/*if (indexToRemove3 !== -1) {
  objects.splice(indexToRemove3, 1);
}*/
// If the object is found, remove it
if (indexToRemove2 !== -1) {
  individualMeshes.splice(indexToRemove2, 1);
}
// If the object is found, remove it
if (indexToRemove3!==undefined&&indexToRemove3 !== -1) {
  array_of_arrays[arraytoremovefrom].splice(indexToRemove3, 1);
}
 // objects.remove(obj);
// Detach TransformControls from the object
transformControls.detach();
scene.remove(transformControls);
// Remove the object from the scene
if(obj.parent.children.length===1&&obj.parent.type!=="Group"){
  for(var omg=5;omg<scene.children.length;omg++){
    if(scene.children[omg].type==='Scene'){
      const childtoremove=obj.parent;
      if(obj.parent.type==="Scene"){
    scene.remove(childtoremove);}else{
      scene.children[omg].remove(childtoremove);
    }
  }
}
  const dynamicAttribute = 'wildcard';
  const attributeValue = obj.userData.layerid; 
  const changelayers=obj.userData.layerid-194;
  // Use querySelector to find the element with the specified dynamic attribute and value
  const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
  elementToRemove.remove();
  // Get all elements with the attribute "example"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {const elid=parseInt(element.id, 10); if (elid > changelayers+lnt){
    // Set the new ID, you can customize this logic based on your requirements
    element.id = element.id-1;
    if(element.attributes[2].nodeValue==="199"){
      counteraki=199;
    }
    else if(element.attributes[2].nodeValue>199){
      if(element.attributes[2].nodeValue-counteraki>1){
    const nodevalue_wild= element.attributes[2].nodeValue;
    const textContent_wild= element.attributes[2].textContent;
    const value_wild= element.attributes[2].value;
    element.attributes[2].nodeValue=nodevalue_wild-1
    element.attributes[2].textContent=textContent_wild-1
    element.attributes[2].value=value_wild-1
    }else{
      counteraki=0;
    }
  }
  counter_wilds++;
}else{
  counter_wilds++;

}
  });counteraki=0;
  var ct=0;
for (var b = 5; b < scene.children.length; b++) { if(checkifthereismodel===false&&chck===false){
  if(scene.children[b].type!=="Scene"){
  scene.children[b].userData.layerid = b + 194+ct; // 199 + (n - 5)
}else{
  for(var css=0; css<scene.children[b].children.length;css++){
    if(scene.children[b].children[css].children.length>0){
      scene.children[b].children[css].children[0].userData.layerid = css+ b + 194+ct;
    }else{
    scene.children[b].children[css].userData.layerid = css+ b + 194+ct; // 199 + (n - 5)  
    }  
  }ct+=scene.children[b].children.length-1;
}
}else{
  if(integerValue!==undefined && scene.children[b].userData.layerid>integerValue|| integerValue2[arraytoremovefrom]!== undefined  && scene.children[b].userData.layerid>integerValue2[arraytoremovefrom]){
 
    if(scene.children[b].type!=="Scene"){
      scene.children[b].userData.layerid=scene.children[b].userData.layerid-1;
    }else{
      for(var css=0; css<scene.children[b].children.length;css++){
        if(scene.children[b].children[css].children.length>0){
          scene.children[b].children[css].children[0].userData.layerid = scene.children[b].children[css].children[0].userData.layerid-1;
        }else{
        scene.children[b].children[css].userData.layerid = scene.children[b].children[css].userData.layerid-1; // 199 + (n - 5)  
        }  
      }//ct+=scene.children[b].children.length-1;
    }
  }else{
    if(scene.children[b].type!=="Scene"&&scene.children[b].userData.layerid>layeridtochange){
      scene.children[b].userData.layerid = scene.children[b].userData.layerid-1; // 199 + (n - 5)
    }    else  if(scene.children[b].type!=="Mesh"){
      for(var cs=0; cs<scene.children[b].children.length;cs++){
        if(scene.children[n].children[cs].children>0){
          for(var i=0; i<scene.children[b].children[cs].children.length;i++){
            if(scene.children[b].children[cs].children.length>0&&scene.children[b].children[cs].children[i].userData.layerid>layeridtochange){
              scene.children[b].children[cs].children[i].userData.layerid =  scene.children[b].children[cs].children[i].userData.layerid-1;
            }else if(scene.children[n].children[cs].children.length<=0&&scene.children[b].children[cs].children[i].userData.layerid>layeridtochange){
              scene.children[b].children[cs].children[i].userData.layerid = scene.children[b].children[cs].children[i].userData.layerid-1; // 199 + (n - 5)  
              }     
          }
        }else{
        if(scene.children[b].children.length>0&&scene.children[b].children[cs].userData.layerid>layeridtochange){
          scene.children[b].children[cs].userData.layerid =  scene.children[b].children[cs].userData.layerid-1;
        }else if(scene.children[b].children.length<=0&&scene.children[b].children[cs].userData.layerid>layeridtochange){
        scene.children[b].children[cs].userData.layerid = scene.children[b].children[cs].userData.layerid-1; // 199 + (n - 5)  
        }  
      }
      }//cn+=scene.children[n].children.length-1;
    }
  }
}
}
}else if(obj.type==="Mesh"&&obj.parent.type==="Scene"&&obj.parent.children.length>4&&obj.parent.uuid===scene.uuid){
scene.remove(obj);
const dynamicAttribute = 'wildcard';
const attributeValue = obj.userData.layerid; 
const changelayers=obj.userData.layerid-194;
//querySelector to find the element with the specified dynamic attribute and value
const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
elementToRemove.remove();
// all elements with the attribute "name"
const elementsWithAttribute = document.querySelectorAll('[wildcard]');

// Change the IDs of each element
elementsWithAttribute.forEach(element => {if(parseInt(element.id)>changelayers+lnt){
  // Set the new ID, you can customize this logic based on your requirements
  element.id = element.id-1;
  if(element.attributes[2].nodeValue==="199"){
    counteraki=199;
  }
  else if(element.attributes[2].nodeValue>199){
    if(element.attributes[2].nodeValue-counteraki>1){
  const nodevalue_wild= element.attributes[2].nodeValue;
  const textContent_wild= element.attributes[2].textContent;
  const value_wild= element.attributes[2].value;
  element.attributes[2].nodeValue=nodevalue_wild-1
  element.attributes[2].textContent=textContent_wild-1
  element.attributes[2].value=value_wild-1
  }else{
    counteraki=0;
  }
}
counter_wilds++;
}else{
  counter_wilds++;

}
});counteraki=0;var cn=0;
for (var n = 5; n < scene.children.length; n++) { if(checkifthereismodel===false&&chck===false){
  if(scene.children[n].type!=="Scene"){
  scene.children[n].userData.layerid = n + 194+cn; // 199 + (n - 5)
}else{
  for(var cs=0; cs<scene.children[n].children.length;cs++){
    if(scene.children[n].children[cs].children.length>0){
      scene.children[n].children[cs].children[0].userData.layerid = cs+ n + 194+cn;
    }else{
    scene.children[n].children[cs].userData.layerid = cs+ n + 194+cn; // 199 + (n - 5)  
    }  
  }cn+=scene.children[n].children.length-1;
}
}else{
  /*if(integerValue!==undefined && scene.children[n].userData.layerid>integerValue|| integerValue2[arraytoremovefrom]!== undefined  && scene.children[n].userData.layerid>integerValue2[arraytoremovefrom] || scene.children[n].userData.layerid===undefined){
    if(scene.children[n].type!=="Scene"){
      scene.children[n].userData.layerid=scene.children[n].userData.layerid-1;
    }else{
      for(var cs=0; cs<scene.children[n].children.length;cs++){
        if(scene.children[n].children[cs].children.length>0){
          scene.children[n].children[cs].children[0].userData.layerid = scene.children[n].children[cs].children[0].userData.layerid-1;
        }else{
        scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
        }  
      }//cn+=scene.children[n].children.length-1;
    }
  }else{*/
    if(scene.children[n].type!=="Scene"&&scene.children[n].userData.layerid>layeridtochange/*&&scene.children[n].geometry.groups.length<=0*/){
      scene.children[n].userData.layerid = scene.children[n].userData.layerid-1; // 199 + (n - 5)
    }
    else  if(scene.children[n].type!=="Mesh"){
      for(var cs=0; cs<scene.children[n].children.length;cs++){
        if(scene.children[n].children[cs].children>0){
          for(var i=0; i<scene.children[n].children[cs].children.length;i++){
            if(scene.children[n].children[cs].children.length>0&&scene.children[n].children[cs].children[i].userData.layerid>layeridtochange){
              scene.children[n].children[cs].children[i].userData.layerid =  scene.children[n].children[cs].children[i].userData.layerid-1;
            }else if(scene.children[n].children[cs].children.length<=0&&scene.children[n].children[cs].children[i].userData.layerid>layeridtochange){
              scene.children[n].children[cs].children[i].userData.layerid = scene.children[n].children[cs].children[i].userData.layerid-1; // 199 + (n - 5)  
              }     
          }
        }else{
        if(scene.children[n].children.length>0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
          scene.children[n].children[cs].userData.layerid =  scene.children[n].children[cs].userData.layerid-1;
        }else if(scene.children[n].children.length<=0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
        scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
        }  
      }
      }//cn+=scene.children[n].children.length-1;
    }
 // }
}
}
}/*else if(obj.type==="Mesh"&&obj.parent.type==="Object3D"){
  for(var t=0;t<scene.children.length;t++){
    if(scene.children[t].type==='Scene'){
      const childtoremove=obj.parent;
    scene.children[t].remove(childtoremove);
  }
}
  const dynamicAttribute = 'wildcard';
  const attributeValue = obj.userData.layerid; 
  const changelayers=obj.userData.layerid-194;
  // Use querySelector to find the element with the specified dynamic attribute and value
  const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
  elementToRemove.remove();
  // Get all elements with the attribute "example"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {const elid=parseInt(element.id, 10); if (elid >= changelayers){
    // Set the new ID, you can customize this logic based on your requirements
    element.id = element.id-1;
    if(element.attributes[2].nodeValue==="199"){
      counteraki=199;
    }
    else if(element.attributes[2].nodeValue>199){
      if(element.attributes[2].nodeValue-counteraki>1){
    const nodevalue_wild= element.attributes[2].nodeValue;
    const textContent_wild= element.attributes[2].textContent;
    const value_wild= element.attributes[2].value;
    element.attributes[2].nodeValue=nodevalue_wild-1
    element.attributes[2].textContent=textContent_wild-1
    element.attributes[2].value=value_wild-1
    }else{
      counteraki=0;
    }
  }
  counter_wilds++;
}else{
  counter_wilds++;

}
  });counteraki=0;
  for(var bi=5;bi<scene.children.length;bi++){
    if(scene.children[bi].type==='Scene'){
      for (var oo = 0; oo < scene.children[bi].length; oo++)
    scene.children[bi].children[oo].userData.layerid = 5+ oo + 194;

  }
}*/
  else if(obj.type==="Mesh"&&obj.parent.type==="Scene"&&obj.parent.uuid!==scene.uuid){
  for(var ti=5;ti<scene.children.length;ti++){
    if(scene.children[ti].type==='Scene'){
      const childtoremove=obj;
    scene.children[ti].remove(childtoremove);
  }
}
  const dynamicAttribute = 'wildcard';
  const attributeValue = obj.userData.layerid; 
  const changelayers=obj.userData.layerid-194;
  // Use querySelector to find the element with the specified dynamic attribute and value
  const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
  elementToRemove.remove();
  // Get all elements with the attribute "example"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {const elid=parseInt(element.id, 10); if (elid > changelayers+lnt){
    // Set the new ID, you can customize this logic based on your requirements
    element.id = element.id-1;
    if(element.attributes[2].nodeValue==="199"){
      counteraki=199;
    }
    else if(element.attributes[2].nodeValue>199){
      if(element.attributes[2].nodeValue-counteraki>1){
    const nodevalue_wild= element.attributes[2].nodeValue;
    const textContent_wild= element.attributes[2].textContent;
    const value_wild= element.attributes[2].value;
    element.attributes[2].nodeValue=nodevalue_wild-1
    element.attributes[2].textContent=textContent_wild-1
    element.attributes[2].value=value_wild-1
    }else{
      counteraki=0;
    }
  }
  counter_wilds++;
}else{
  counter_wilds++;

}
  });counteraki=0;
  var cd=0;
  for (var n = 5; n < scene.children.length; n++) {if(checkifthereismodel===false&&chck===false){
    if(scene.children[n].type!=="Scene"){
    scene.children[n].userData.layerid = n + 194+cd; // 199 + (n - 5)
  }else{
    for(var csd=0; csd<scene.children[n].children.length;csd++){
      if(scene.children[n].children[csd].children.length>0){
        scene.children[n].children[csd].children[0].userData.layerid = csd+ n + 194+cd;
      }else{
      scene.children[n].children[csd].userData.layerid = csd+ n + 194+cd; // 199 + (n - 5)  
      }  
    }cd+=scene.children[n].children.length-1;
  }
  }else{
    if(integerValue!==undefined && scene.children[n].userData.layerid>integerValue|| integerValue2[arraytoremovefrom]!== undefined  && scene.children[n].userData.layerid>integerValue2[arraytoremovefrom]){
      if(scene.children[n].type!=="Scene"){
        scene.children[n].userData.layerid=scene.children[n].userData.layerid-1;
      }else{
        for(var cs=0; cs<scene.children[n].children.length;cs++){
          if(scene.children[n].children[cs].children.length>0){
            scene.children[n].children[cs].children[0].userData.layerid = scene.children[n].children[cs].children[0].userData.layerid-1;
          }else{
          scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
          }  
        }//cn+=scene.children[n].children.length-1;
      }
    }else{
      if(scene.children[n].type!=="Scene"&&scene.children[n].userData.layerid>layeridtochange){
        scene.children[n].userData.layerid = scene.children[n].userData.layerid-1; // 199 + (n - 5)
      }    else  if(scene.children[n].type!=="Mesh"){
        for(var cs=0; cs<scene.children[n].children.length;cs++){
          if(scene.children[n].children[cs].children>0){
            for(var i=0; i<scene.children[n].children[cs].children.length;i++){
              if(scene.children[n].children[cs].children.length>0&&scene.children[n].children[cs].children[i].userData.layerid>layeridtochange){
                scene.children[n].children[cs].children[i].userData.layerid =  scene.children[n].children[cs].children[i].userData.layerid-1;
              }else if(scene.children[n].children[cs].children.length<=0&&scene.children[n].children[cs].children[i].userData.layerid>layeridtochange){
                scene.children[n].children[cs].children[i].userData.layerid = scene.children[n].children[cs].children[i].userData.layerid-1; // 199 + (n - 5)  
                }     
            }
          }else{
          if(scene.children[n].children.length>0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
            scene.children[n].children[cs].userData.layerid =  scene.children[n].children[cs].userData.layerid-1;
          }else if(scene.children[n].children.length<=0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
          scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
          }  
        }
        }//cn+=scene.children[n].children.length-1;
      }
    }
}
}
}else if(obj.type==="Mesh"&&obj.parent.type==="Group"){

  for(var ef=5;ef<scene.children.length;ef++){  
    if(scene.children[ef].type==='Group'){
      if(scene.children[ef].children.length>1){
      const childtoremove=obj;
    scene.children[ef].remove(childtoremove);
  }else{
    const childtoremove=obj.parent;
    scene.remove(childtoremove);
  }
}}
  const dynamicAttribute = 'wildcard';
  const attributeValue = obj.userData.layerid; 
  const changelayers=obj.userData.layerid-194;
  // Use querySelector to find the element with the specified dynamic attribute and value
  const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
  elementToRemove.remove();
  // Get all elements with the attribute "example"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {const elid=parseInt(element.id, 10); if (elid >= changelayers+lnt){
    // Set the new ID, you can customize this logic based on your requirements
    element.id = element.id-1;
    if(element.attributes[2].nodeValue==="199"){
      counteraki=199;
    }
    else if(element.attributes[2].nodeValue>199){
      if(element.attributes[2].nodeValue-counteraki>1){
    const nodevalue_wild= element.attributes[2].nodeValue;
    const textContent_wild= element.attributes[2].textContent;
    const value_wild= element.attributes[2].value;
    element.attributes[2].nodeValue=nodevalue_wild-1
    element.attributes[2].textContent=textContent_wild-1
    element.attributes[2].value=value_wild-1
    }else{
      counteraki=0;
    }
  }
  counter_wilds++;
}else{
  counter_wilds++;

}
  });counteraki=0;
  var cnn=0;
  for (var n = 5; n < scene.children.length; n++) {  if(checkifthereismodel===false){
    if(scene.children[n].type!=="Scene"){
    scene.children[n].userData.layerid = n + 194+cnn; // 199 + (n - 5)
  }else{
    for(var csf=0; csf<scene.children[n].children.length;csf++){
      if(scene.children[n].children[csf].children.length>0){
        scene.children[n].children[csf].children[0].userData.layerid = csf+ n + 194+cnn;
      }else{
      scene.children[n].children[csf].userData.layerid = csf+ n + 194+cnn; // 199 + (n - 5)  
      }  
    }cnn+=scene.children[n].children.length-1;
  }
  }else{
    if(integerValue!==undefined && scene.children[n].userData.layerid>integerValue|| integerValue2[arraytoremovefrom]!== undefined  && scene.children[n].userData.layerid>integerValue2[arraytoremovefrom]){
      if(scene.children[n].type!=="Scene"){
        scene.children[n].userData.layerid=scene.children[n].userData.layerid-1;
      }else{
        for(var cs=0; cs<scene.children[n].children.length;cs++){
          if(scene.children[n].children[cs].children.length>0){
            scene.children[n].children[cs].children[0].userData.layerid = scene.children[n].children[cs].children[0].userData.layerid-1;
          }else{
          scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
          }  
        }//cn+=scene.children[n].children.length-1;
      }
    }else{
      if(scene.children[n].type!=="Scene"&&scene.children[n].userData.layerid>layeridtochange){
        scene.children[n].userData.layerid = scene.children[n].userData.layerid-1; // 199 + (n - 5)
      }else{
        for(var cs=0; cs<scene.children[n].children.length;cs++){
          if(scene.children[n].children[cs].children.length>0&&scene.children[n].userData.layerid>layeridtochange){
            scene.children[n].children[cs].children[0].userData.layerid =  scene.children[n].children[cs].children[0].userData.layerid-1;
          }else if(scene.children[n].children[cs].children.length<=0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
          scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
          }  
        }//cn+=scene.children[n].children.length-1;
      }
    }
  }
}
}else if(obj.type==="Group"){

  for(var fi=5;fi<scene.children.length;fi++){
    if(scene.children[fi].type==='Group'){
 
    const childtoremove=obj;
    scene.remove(childtoremove);
  }
}
  const dynamicAttribute = 'wildcard';
  const attributeValue = obj.children[0].userData.layerid; 
  const changelayers=obj.children[0].userData.layerid-194;
  // Use querySelector to find the element with the specified dynamic attribute and value
  const elementToRemove = document.querySelector(`[${dynamicAttribute}="${attributeValue}"]`);
  elementToRemove.remove();
  // Get all elements with the attribute "example"
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  // Change the IDs of each element
  elementsWithAttribute.forEach(element => {const elid=parseInt(element.id, 10); if (elid > changelayers+lnt){
    // Set the new ID, you can customize this logic based on your requirements
    element.id = element.id-1;
    if(element.attributes[2].nodeValue==="199"){
      counteraki=199;
    }
    else if(element.attributes[2].nodeValue>199){
      if(element.attributes[2].nodeValue-counteraki>1){
    const nodevalue_wild= element.attributes[2].nodeValue;
    const textContent_wild= element.attributes[2].textContent;
    const value_wild= element.attributes[2].value;
    element.attributes[2].nodeValue=nodevalue_wild-1
    element.attributes[2].textContent=textContent_wild-1
    element.attributes[2].value=value_wild-1
    }else{
      counteraki=0;
    }
  }
  counter_wilds++;
}else{
  counter_wilds++;

}
  });counteraki=0;
  var cnr=0;
  for (var n = 5; n < scene.children.length; n++) {    if(checkifthereismodel===false){
    if(scene.children[n].type!=="Scene"){
    scene.children[n].userData.layerid = n + 194+cnr; // 199 + (n - 5)
  }else{
    for(var csr=0; csr<scene.children[n].children.length;csr++){
      if(scene.children[n].children[csr].children.length>0){
        scene.children[n].children[csr].children[0].userData.layerid = csr+ n + 194+cnr;
      }else{
      scene.children[n].children[csr].userData.layerid = csr+ n + 194+cnr; // 199 + (n - 5)  
      }  
    }cnr+=scene.children[n].children.length-1;
  }
  }else{
      if(integerValue!==undefined && scene.children[n].userData.layerid>integerValue|| integerValue2[arraytoremovefrom]!== undefined  && scene.children[n].userData.layerid>integerValue2[arraytoremovefrom] ){
        if(scene.children[n].type!=="Scene"){
          scene.children[n].userData.layerid=scene.children[n].userData.layerid-1;
        }else{
          for(var cs=0; cs<scene.children[n].children.length;cs++){
            if(scene.children[n].children[cs].children.length>0){
              scene.children[n].children[cs].children[0].userData.layerid = scene.children[n].children[cs].children[0].userData.layerid-1;
            }else{
            scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
            }  
          }//cn+=scene.children[n].children.length-1;
        }
      }else{
        if(scene.children[n].type!=="Scene"&&scene.children[n].userData.layerid>layeridtochange){
          scene.children[n].userData.layerid = scene.children[n].userData.layerid-1; // 199 + (n - 5)
        }else{
          for(var cs=0; cs<scene.children[n].children.length;cs++){
            if(scene.children[n].children[cs].children.length>0&&scene.children[n].userData.layerid>layeridtochange){
              scene.children[n].children[cs].children[0].userData.layerid =  scene.children[n].children[cs].children[0].userData.layerid-1;
            }else if(scene.children[n].children[cs].children.length<=0&&scene.children[n].children[cs].userData.layerid>layeridtochange){
            scene.children[n].children[cs].userData.layerid = scene.children[n].children[cs].userData.layerid-1; // 199 + (n - 5)  
            }  
          }//cn+=scene.children[n].children.length-1;
        }
      }
    
  }
}
}
for(var i=0;i<integerValue2.length;i++){
  if(obj.userData.layerid<integerValue2[i]){
    integerValue2[i]=integerValue2[i]-1;
    mrgbtnswildcararray[i]=mrgbtnswildcararray[i]-1;
    mrgbtnsids[i]=mrgbtnsids[i]-1;
  }
}
localStorage.setItem("id", JSON.stringify(mrgbtnswildcararray));
localStorage.setItem("mrgbtnswildcararray", JSON.stringify(mrgbtnswildcararray));
}


function addHistory(oldObjData , newObjData ) {      
  
  if(oldObjData && newObjData && oldObjData.uuid == newObjData.uuid) {
   editorHistory.add({
            undo: function() {    
              if(oldObjData.uuid==obj.uuid){
                resetObject(oldObjData);
                obj.position.copy( nowObj.position );
                obj.scale.copy( nowObj.scale );
                const euler = new THREE.Euler(nowObj.rotation.x, nowObj.rotation.y, nowObj.rotation.z);
                obj.rotation.copy(euler);
                document.getElementById("x").value = transformControls.children[0].object.position.x;
                document.getElementById("y").value = transformControls.children[0].object.position.y;
                document.getElementById("z").value = transformControls.children[0].object.position.z;
                document.getElementById("x_r").value = transformControls.children[0].object.rotation.x;
                document.getElementById("y_r").value = transformControls.children[0].object.rotation.y;
                document.getElementById("z_r").value = transformControls.children[0].object.rotation.z;
                document.getElementById("x_s").value = transformControls.children[0].object.scale.x;
                document.getElementById("y_s").value = transformControls.children[0].object.scale.y;
                document.getElementById("z_s").value = transformControls.children[0].object.scale.z;
              }else{                
                var check=true;         

                while(check){

                for(var i=0;i<objectdata.length;i++){
                  console.log(objectdata[i]);
                  if(objectdata[i].uuid==obj.uuid && objectdata[i].position!=obj.position)             
                {
                  objdata=getObjectData(objectdata[i]);
                //  }{
                  resetObject(objdata);
                  obj.position.copy( nowObj.position );
                  obj.scale.copy( nowObj.scale );
                  const euler = new THREE.Euler(nowObj.rotation.x, nowObj.rotation.y, nowObj.rotation.z);
                  obj.rotation.copy(euler);
                  document.getElementById("x").value = transformControls.children[0].object.position.x;
                  document.getElementById("y").value = transformControls.children[0].object.position.y;
                  document.getElementById("z").value = transformControls.children[0].object.position.z;
                  document.getElementById("x_r").value = transformControls.children[0].object.rotation.x;
                  document.getElementById("y_r").value = transformControls.children[0].object.rotation.y;
                  document.getElementById("z_r").value = transformControls.children[0].object.rotation.z;
                  document.getElementById("x_s").value = transformControls.children[0].object.scale.x;
                  document.getElementById("y_s").value = transformControls.children[0].object.scale.y;
                  document.getElementById("z_s").value = transformControls.children[0].object.scale.z;                  
                  check=false;                
                }
                  
              }
              }
            }
              },
            redo: function() {
              if(newObjData.uuid==obj.uuid){
                resetObject(newObjData);
                obj.position.copy( nowObj.position );
                obj.scale.copy( nowObj.scale );
                const euler = new THREE.Euler(nowObj.rotation.x, nowObj.rotation.y, nowObj.rotation.z);
                obj.rotation.copy(euler);
                document.getElementById("x").value = transformControls.children[0].object.position.x;
                document.getElementById("y").value = transformControls.children[0].object.position.y;
                document.getElementById("z").value = transformControls.children[0].object.position.z;
                document.getElementById("x_r").value = transformControls.children[0].object.rotation.x;
                document.getElementById("y_r").value = transformControls.children[0].object.rotation.y;
                document.getElementById("z_r").value = transformControls.children[0].object.rotation.z;
                document.getElementById("x_s").value = transformControls.children[0].object.scale.x;
                document.getElementById("y_s").value = transformControls.children[0].object.scale.y;
                document.getElementById("z_s").value = transformControls.children[0].object.scale.z;
              }else{                
                var check=true;         

                while(check){

                for(var i=0;i<objectdata1.length;i++){
                  console.log(objectdata1[i]);
                  if(objectdata1[i].uuid==obj.uuid)             
                {
                  objdata=getObjectData(objectdata1[i]);
                //  }{
                  resetObject(objdata);
                  obj.position.copy( nowObj.position );
                  obj.scale.copy( nowObj.scale );
                  const euler = new THREE.Euler(nowObj.rotation.x, nowObj.rotation.y, nowObj.rotation.z);
                  obj.rotation.copy(euler);
                  document.getElementById("x").value = transformControls.children[0].object.position.x;
                  document.getElementById("y").value = transformControls.children[0].object.position.y;
                  document.getElementById("z").value = transformControls.children[0].object.position.z;
                  document.getElementById("x_r").value = transformControls.children[0].object.rotation.x;
                  document.getElementById("y_r").value = transformControls.children[0].object.rotation.y;
                  document.getElementById("z_r").value = transformControls.children[0].object.rotation.z;
                  document.getElementById("x_s").value = transformControls.children[0].object.scale.x;
                  document.getElementById("y_s").value = transformControls.children[0].object.scale.y;
                  document.getElementById("z_s").value = transformControls.children[0].object.scale.z;
                  check=false;
                  }
              }
              }
            }            }
        });
    }
}
function resetObject(data) {
   nowObj = {
    
    uuid:data.uuid,// you can find object by data.uuid.
    position: ({x: data.position.x, y: data.position.y, z: data.position.z}), 
    rotation: ({x: data.rotation.x, y: data.rotation.y, z: data.rotation.z}),
    scale: ({x: data.scale.x, y: data.scale.y, z: data.scale.z}),
}; 
return nowObj;
}
//////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////copy_paste/////////////////////////////////////////
var i=0;var clonemeter=0;

export function cloning(){
  checkifthereismodel_tuc();
  splitwhenload();
i++;var chcklayer=0;
scene.remove(transformControls);
  const objclone = obj.clone();
  if(obj.parent.userData.objloaded===true){
    objclone.userData.objloaded=true;
  }
  objclone.position.copy(obj.position)
  objclone.scale.copy( obj.scale );
  objclone.rotation.copy(obj.rotation );
  objclone.castShadow=true;
  objclone.receiveShadow=true;
  objects.push(objclone);

  
  const uuidToclone = obj.uuid;
  const arraytocloneto=obj.userData.catchmergebtn;
  const indexToClone= individualMeshes.findIndex(item => item.uuid === uuidToclone);
  if(arraytocloneto!==undefined){
  var indexToClone2= array_of_arrays[arraytocloneto].findIndex(item => item.uuid === uuidToclone);
  }
  if (indexToClone !== -1) {
    individualMeshes.push(objclone);
  }
  if (indexToClone2!==undefined&&indexToClone2 !== -1) {
    array_of_arrays[arraytocloneto].push(objclone);
  }
  
  scene.add(objclone);
  objclone.userData.editable =true;
  const elementsWithAttribute = document.querySelectorAll('[wildcard]');
  
  elementsWithAttribute.forEach(element => {
    chcklayer++;
  });
  objclone.userData.layerid=199+chcklayer;
  if(obj.parent.type==="Object3D"){
    if(scene.children[scene.children.length-1]!=null){
    
      const layer_kiddo = document.createElement("button");
      layer_kiddo.setAttribute('id',scene.children.length-1+chcklayer+nestedscenelength-clonemeter);
      layer_kiddo.setAttribute('class', "layer");
      layer_kiddo.setAttribute("wildcard", objclone.userData.layerid);
      document.body.appendChild(layer_kiddo);
      const node = document.getElementById(scene.children.length-1+chcklayer+nestedscenelength-clonemeter);
      document.getElementById("layers").appendChild(node);
      document.getElementById(scene.children.length-1+chcklayer+nestedscenelength-clonemeter).innerHTML = scene.children[scene.children.length-1].userData.name;
    
    }
chcklayer=0;
clonemeter++;
}else{
    if(scene.children[scene.children.length-1]!=null){
    
      const layer_kiddo = document.createElement("button");
      layer_kiddo.setAttribute('id',scene.children.length-1+lnt+nestedscenelength+howmanymergedbtns);
      layer_kiddo.setAttribute('class', "layer");
      layer_kiddo.setAttribute("wildcard", objclone.userData.layerid);
      document.body.appendChild(layer_kiddo);
      const node = document.getElementById(scene.children.length-1+lnt+nestedscenelength+howmanymergedbtns);
      document.getElementById("layers").appendChild(node);
      if(scene.children[scene.children.length-1].userData.name!==undefined){
      document.getElementById(scene.children.length-1+lnt+nestedscenelength+howmanymergedbtns).innerHTML = scene.children[scene.children.length-1].userData.name;
      }else{
        document.getElementById(scene.children.length-1+lnt+nestedscenelength+howmanymergedbtns).innerHTML = scene.children[scene.children.length-1].name;
      }
    }
chcklayer=0;
}

}
export var uploaded_image;
export var imgname;
const image_input = document.querySelector("#image-input");
image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;

   //document.querySelector("#uploadimage").style.backgroundImage = `url(${uploaded_image})`;
    
  });
  imgname=this.files[0].name;
  reader.readAsDataURL(this.files[0]); //read contents of the file
////for obj textures///////////// edw kalytera na stelnw to up adi to uploaded image
//var up = URL.createObjectURL(this.files[0]);  
}); 

///////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////colour_palette///////////////////////////////////////

export let colorpicker;
const defaultColor = "#f1f1f1";

window.addEventListener("load", startup, false);

function startup() {
  colorpicker = document.getElementById("colorpicker");
  colorpicker.value = defaultColor;
  colorpicker.addEventListener("input", updateFirst, false);
  colorpicker.select();
}

function updateFirst(event) {
  const sb = scene.background;
    sb.set(event.target.value);
}

export let colorpicker2;
const defaultColor2 = "#025702";

window.addEventListener("load", startup1, false);

function startup1() {
  colorpicker2 = document.getElementById("colorpicker2");
  colorpicker2.value = defaultColor2;
  colorpicker2.addEventListener("input", updateFirst1, false);
  colorpicker2.select();
}

function updateFirst1(event) {
  obj.material.color.set( event.target.value );
}
/////////////////////////////////////////////////////////////////////////////////
//const gui = new GUI();


var sun = new THREE.Vector3();
sun.castShadow=true;

/*
var ground;

var rgb=new THREE.RGBELoader().load('textures/small_empty_room_1_8k.hdr', texture => {
  const gen = new THREE.PMREMGenerator(renderer)
  const envMap = gen.fromEquirectangular(texture).texture
  scene.environment = envMap
  scene.background = envMap
  
  texture.dispose()
  gen.dispose()
})
*/

export	var	water;
				// Water
       export function addocean(){
if(check===false){
				const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

			water = new THREE.Water(
					waterGeometry,
					{
						textureWidth: 512,
						textureHeight: 512,
						waterNormals: new THREE.TextureLoader().load( load_water, function ( texture ) {

							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

						} ),
						sunDirection: new THREE.Vector3(),
						sunColor: 0xffffff,
						waterColor: 0x001e0f,
            side:THREE.DoubleSide,
						distortionScale: 1.1,
						fog: scene.fog !== undefined
					}
				);

				water.rotation.x = - Math.PI / 2;
objects.push(water);
water.userData.editable =true;
water.name="Water";

				scene.add( water );

        const waterUniforms = water.material.uniforms;
				waterUniforms[ 'size' ].value = 10;

				/*const folderWater = gui.addFolder( 'Water' );
				folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
				folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
				folderWater.open();
        */
        
      }else{
        const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

        water = new THREE.Water(
            waterGeometry,
            {
              textureWidth: 512,
              textureHeight: 512,
              waterNormals: new THREE.TextureLoader().load( load_water, function ( texture ) {
  
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  
              } ),
              sunDirection: new THREE.Vector3(),
              sunColor: 0xffffff,
              waterColor: 0x001e0f,
              side:THREE.DoubleSide,
              distortionScale: 1.1,
              fog: scene.fog !== undefined
            }
          );
  
          water.rotation.x = - Math.PI / 2;
  objects.push(water);
  water.userData.editable =true;
  water.name="Water";
 // water.geometry.deleteAtrribute('position');
  water.position.x=pos[0]
  water.position.y=pos[1]
  water.position.z=pos[2]

  water.rotation.x=rot[0]
  water.rotation.y=rot[1]
  water.rotation.z=rot[2]

  water.scale.x=scl[0]
  water.scale.y=scl[1]
  water.scale.z=scl[2]

          scene.add( water );
  pos=[];
  rot=[];
  scl=[];
          const waterUniforms = water.material.uniforms;
          waterUniforms[ 'size' ].value = 10;
//check=false;
      }

        if(scene.children[scene.children.length-1]!=null){
          scene.remove(transformControls);

          const layer = document.createElement("button");
          layer.setAttribute('id', scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
          layer.setAttribute('class', "layer");
          layer.setAttribute("wildcard", scene.children[scene.children.length-1].id+nestedscenelength);
          document.body.appendChild(layer);
          const node = document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength);
          document.getElementById("layers").appendChild(node);
          document.getElementById(scene.children.length-1+howmanymergedbtns+lnt+nestedscenelength).innerHTML = water.name;
        }
checkthewildcards();
    }
				// Skybox

				const sky = new THREE.Sky();
				sky.scale.setScalar( 10000 );
        sky.userData.name="Sky";
				scene.add( sky );

				const skyUniforms = sky.material.uniforms;

				skyUniforms[ 'turbidity' ].value = 7;
				skyUniforms[ 'rayleigh' ].value = 2;
				skyUniforms[ 'mieCoefficient' ].value = 0.005;
				skyUniforms[ 'mieDirectionalG' ].value = 0.8;

				const parameters = {
					elevation: 2,
					azimuth: 180
				};

				const pmremGenerator = new THREE.PMREMGenerator( renderer );
				const sceneEnv = new THREE.Scene();

				let renderTarget;

				function updateSun() {

					const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
					const theta = THREE.MathUtils.degToRad( parameters.azimuth );

					sun.setFromSphericalCoords( 1, phi, theta );

					sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
				if(water!=null)	water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

					if ( renderTarget !== undefined ) renderTarget.dispose();

					sceneEnv.add( sky );
					renderTarget = pmremGenerator.fromScene( sceneEnv );
					scene.add( sky );

					scene.environment = renderTarget.texture;

				}

				updateSun();

		//		const geometry = new THREE.BoxGeometry( 30, 30, 30 );
		//		const material = new THREE.MeshStandardMaterial( { roughness: 0 } );

		//	var	mesh = new THREE.Mesh( geometry, material );
		//		scene.add( mesh );

				//

				/*controls = new OrbitControls( camera, renderer.domElement );
				controls.maxPolarAngle = Math.PI * 0.495;
				controls.target.set( 0, 10, 0 );
				controls.minDistance = 40.0;
				controls.maxDistance = 200.0;
				controls.update();
*/
				//

			/*	stats = new Stats();
				container.appendChild( stats.dom );
*/
				// GUI

/*
				const folderSky = gui.addFolder( 'Sky' );
				folderSky.add( parameters, 'elevation', 0, 90, 0.1 ).onChange( updateSun );
				folderSky.add( parameters, 'azimuth', - 180, 180, 0.1 ).onChange( updateSun );
				folderSky.open();
*/
       // water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

				//

///////////////////layers//////////////////////
var flag;
var btn_layer = document.getElementById('layers');
btn_layer.addEventListener('click', function(event) { scene.add(transformControls);
console.log(event.target);
/*if(lnt===null){
  if(event.target.id>scene.children.length-3 && scene.children[scene.children.length-2].children.length>1){
    if(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)].type==="Object3D"){
    transformControls.attach(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)].children[0]);
    obj=null;
    obj=scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)].children[0];
    }else{
      transformControls.attach(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)]);
      obj=null;
      obj=scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)];

    }
  }else{
if(scene.children[event.target.id].type!="Scene"){
transformControls.attach(scene.children[event.target.id]);
obj=null;
obj=scene.children[event.target.id];
}else{
  transformControls.attach(scene.children[event.target.id].children[0]);
  obj=null;
  obj=scene.children[event.target.id].children[0]

}}
}else{*//*
 flag=true;
for(var kk=5;kk<scene.children.length-1;kk++){
  if(scene.children[kk].children.length>1&&event.target.id<scene.children.length-2+scene.children[kk].children.length&&scene.children[kk].children[0].parent.uuid===scene.children[kk].children[event.target.id-lnt].parent.uuid){
    transformControls.attach(scene.children[kk].children[event.target.id-(kk)-lnt]);
    obj=null;
    obj=scene.children[kk].children[event.target.id-(kk)-lnt];
    flag=false;

  }
}
  if(flag!=="false"){

  if(event.target.id>scene.children.length-3 && scene.children[scene.children.length-2].children.length>1){
    if(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)-lnt].type==="Object3D"){
    transformControls.attach(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)-lnt].children[0]);
    obj=null;
    obj=scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)-lnt].children[0];
    }else{
      transformControls.attach(scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)-lnt]);
      obj=null;
      obj=scene.children[scene.children.length-2].children[event.target.id-(scene.children.length-2)-lnt];

    }
  }else{
  if(scene.children[event.target.id-lnt].type!=="Scene"){
    transformControls.attach(scene.children[event.target.id-lnt]);
    obj=null;
    obj=scene.children[event.target.id-lnt];

    }else{
      transformControls.attach(scene.children[event.target.id-lnt].children[0]);
      obj=null;
      obj=scene.children[event.target.id-lnt].children[0];
    }
}
  }*/
  var atValue = event.target.getAttribute('wildcard');

  var atValueNum=parseInt(atValue, 10)
  scene.traverse( function( object) {
					if (atValueNum===object.userData.layerid)
          {
            if (object.userData.merged !== undefined){
              transformControls.setMode('translate');
            }
            transformControls.attach(object);
            obj=null;
            obj=object;
            if(obj.userData.intersectionPoint===undefined){
            transformControls.position.set(0, 0, 0);
            if(obj.name!==''&&obj.userData.name===undefined){
              document.getElementById("uuid1").innerHTML = obj.name;}else{ document.getElementById("uuid1").innerHTML = obj.userData.name;}
              document.getElementById("x").value = obj.position.x;
              document.getElementById("y").value = obj.position.y;
              document.getElementById("z").value = obj.position.z;
              document.getElementById("x_r").value = obj.rotation.x;
              document.getElementById("y_r").value = obj.rotation.y;
              document.getElementById("z_r").value = obj.rotation.z;
              document.getElementById("x_s").value = obj.scale.x;
              document.getElementById("y_s").value = obj.scale.y;
              document.getElementById("z_s").value = obj.scale.z;
          }else{
            if (object.userData.merged !== undefined){
              transformControls.setMode('translate');
            }
            const intersectionPoint = obj.userData.intersectionPoint;
            transformControls.position.copy(intersectionPoint);
            if(obj.name!==''&&obj.userData.name===undefined){
              document.getElementById("uuid1").innerHTML = obj.name;}else{ document.getElementById("uuid1").innerHTML = obj.userData.name;}
              document.getElementById("x").value = obj.position.x;
              document.getElementById("y").value = obj.position.y;
              document.getElementById("z").value = obj.position.z;
              document.getElementById("x_r").value = obj.rotation.x;
              document.getElementById("y_r").value = obj.rotation.y;
              document.getElementById("z_r").value = obj.rotation.z;
              document.getElementById("x_s").value = obj.scale.x;
              document.getElementById("y_s").value = obj.scale.y;
              document.getElementById("z_s").value = obj.scale.z;
          }
          }
        } );
//}
});

